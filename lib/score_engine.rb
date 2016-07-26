# ScoreEngine: Calculates normalized scores from user defined score models.
#
# Scores are built bottom up starting with raw data points.  Data at each node is
# normalied againts the set using z-scores.  Parent nodes aggregate their weighted
# children.  The root node (Score) is scaled using ranking.
#
# == Notes:
#
# * Class method ScoreEngine.cache_z_scores precaclulates z-scores for all
#  	known data points.  This needs to be re-excuted if new data is added or changed.
# 	Also the cache normalizes against the entire set - this needs to be upgraded
# 	when we expand the asset types and data sources are no longer consistent.
#
# * Aggregate functions have been implemented, but there is no validation for order
#  	execution.   i.e. what will be made the divisor / first node for subtraction
# 	is based on insertion order, but will not be accurate if nodes are deleted/added via drag/drop.
#
# * During traversal all scores and data are stored in the normalize hash.  This
#  	could get scary as the data set grows [ SIZE = N(entities) * N(nodes) ]
#
#   Quickfix = null out sets after processed.
#
#
#
class ScoreEngine
  attr_accessor :score, :nodes, :tree

  def self.recalculate_scores_for_tenant(tenant)
    Apartment::Tenant.switch! tenant
    Score.order(id: :asc).each do |score|
      if score.id != 22
        ScoreEngine.calculate_score(score.id)
      end
    end
  end

  # Constructor, initialize score model data.
  #
  # @param [Int] score_id: the idea of the model to score
  # @return [ScoreEngine] the ScoreEngine instance
  def initialize( score_id )
    @score = Score.find( score_id )
    @nodes = @score.score['nodeDataArray']
    @tree = build_score_tree
  end

  # Calculates and saves scores for a specified score model.
  # Entry point for ActiveJob async calculations.
  #
  # @param [Score] score: the score model
  def self.calculate_score( score_id )
    score = Score.find( score_id )
    ScoreEngine.cache_z_scores(score)
    ScoreEngine.cache_metric_rank(score)
    engine = ScoreEngine.new( score_id )
    scores = engine.calculate_scores
    metric_name = score.name.split(" ").join("_").downcase

    scores.keys.each do |key|
      metric = Metric.where(:entity_key => key, :metric => metric_name).first
      if not metric.nil?
        metric.delete
      end
      Metric.new(
        :entity_key => key,
        :source => 'score',
        :metric => metric_name,
        :value => scores[key][1],
        :icon => '/metrics/score.png'
      ).save
    end
    # hacky - queue up the aggregate score after any other score changes
    if score_id != 22
      ScoreWorker.perform_async(22)
    end
    Pusher.trigger('score_engine', 'score_updated_event', {
      message: "#{score.name} updated!"
    })
  end

  # Extract relevant data from model to build
  # score tree.
  #
  # @param [Hash] n: the node to build
  # @return [Hash] tree node
  def build_node_from_model( n )
    return {
      'id' => n['key'].to_i,
      'parent_id' => n['parent'].to_i,
      'children' => [],
      'weight' => n['weight'].to_i / 100.0,
      'operation' => n['name'],
      'metric' => n['dataname']
    }
  end

  # Builds a tree data structure from model node list
  #
  # @return [Hash] the tree as a hash
  def build_score_tree
    tree_nodes = []
    root_node = nil

    @nodes.each do |n|
      if n['key'] == 1
        root_node = build_node_from_model(n)
        root_node['parent_id'] = 0
      else
        tree_nodes.push(build_node_from_model(n))
      end
    end

    node_list = { 1 => root_node }
    tree_nodes.each do |n|
      node_list[n['id']] = n
      node_list[n['parent_id']]['children'].push(node_list[n['id']])
    end
    return root_node
  end

  # Scores a leaf node as defined in the scoring model.  Currently assumes
  # that all raw metrics have a pre-calculated norm_value saved on the
  # metric.  See: self.cache_z_scores
  #
  # @param [Hash] node: the score model leaf 'value' node
  # @param [Hash] normalized: the current set of normalized score points
  # @return [Hash] updated normalized
  def score_base_node( node, normalized )
    Asset.where(:active => true).each do |a|
      metric = a.metrics.where(:metric => node['metric']).first
      entity_hash = normalized[a.entity_key]
      if entity_hash.nil?
        entity_hash = Hash.new
      end
      puts "!!!: #{node}, #{metric.inspect} #{a.name}"
      entity_hash[node['id']] = node['weight'] * metric.norm_value
      normalized[a.entity_key] = entity_hash
    end
    normalized
  end

  # Scores a parent node as defined in the scoring model.
  #
  # @param [Hash] node: the parent node
  # @param [Hash] normalized: cached normalizations for aggregation
  # @return [Hash] updated normalized
  def score_aggregate_node( node, normalized, z_score = true )
    aggregation = Hash.new
    case node['operation']
    when 'SUM'
      aggregation = sum_aggregation( node, normalized )
    when 'DIVIDE'
      aggregation = divide_aggregation( node, normalized )
    when 'DIFFERENCE'
      aggregation = subtract_aggregation( node, normalized )
    when 'MULTIPLY'
      aggregation = multiply_aggregation( node, normalized )
    end
    if z_score
      z_scores = z_score(aggregation)
      normalized.keys.each do |key|
        normalized[key][node['id']] = node['weight'] * z_scores[key]
      end
      normalized
    else
      aggregation
    end
  end

  # Calculates the z-scores for a set of values.
  #
  # @param [Hash] aggregation: set of aggregated child scores
  # @return [Hash] z-scores for the aggregation
  def z_score( aggregation )
    z_scores = Hash.new
    mean = aggregation.values.sum / aggregation.values.size.to_f
    stdev = ScoreEngine.standard_deviation(mean, aggregation.values)
    aggregation.keys.each do |key|
      z_scores[key] = ScoreEngine.z_score(aggregation[key], mean, stdev)
    end
    z_scores
  end

  # Executes a sum aggregation of normalized child values.
  #
  # @param [Hash] node: the node whose children to aggregate
  # @param [Hash] normalized: child values cache
  # @return [Hash] aggregated node value
  def sum_aggregation( node, normalized )
    aggregation = Hash.new
    normalized.keys.each do |entity|
      sum = 0
      node['children'].each do |child|
        entity_hash = normalized[entity]
        if entity_hash.nil?
          entity_hash = Hash.new
        end
        sum += entity_hash[child['id']]
      end
      aggregation[entity] = sum
    end
    aggregation
  end

  # Executes a multiplication aggregation of normalized child values.
  #
  # @param [Hash] node: the node whose children to aggregate
  # @param [Hash] normalized: child values cache
  # @return [Hash] aggregated node value
  def multiply_aggregation( node, normalized )
    aggregation = Hash.new
    normalized.keys.each do |entity|
      multiplicand = 0
      node['children'].each do |child|
        entity_hash = normalized[entity]
        if entity_hash.nil?
          entity_hash = Hash.new
        end
        if multiplicand == 0
          multiplicand = entity_hash[child['id']]
        else
          multiplicand *= entity_hash[child['id']]
        end
      end
      aggregation[entity] = multiplicand
    end
    aggregation
  end

  # Executes a subtraction aggregation of normalized child values.
  #
  # @param [Hash] node: the node whose children to aggregate
  # @param [Hash] normalized: child values cache
  # @return [Hash] aggregated node value
  def subtract_aggregation( node, normalized )
    aggregation = Hash.new
    normalized.keys.each do |entity|
      difference = 0
      node['children'].each do |child|
        entity_hash = normalized[entity]
        if entity_hash.nil?
          entity_hash = Hash.new
        end
        if difference == 0
          difference = entity_hash[child['id']]
        else
          difference -= entity_hash[child['id']]
        end
      end
      aggregation[entity] = difference
    end
    aggregation
  end


  # Executes a division aggregation of normalized child values.
  #
  # @param [Hash] node: the node whose children to aggregate
  # @param [Hash] normalized: child values cache
  # @return [Hash] aggregated node value
  def divide_aggregation( node, normalized )
    aggregation = Hash.new
    normalized.keys.each do |entity|
      quotient = 0
      node['children'].each do |child|
        entity_hash = normalized[entity]
        if entity_hash.nil?
          entity_hash = Hash.new
        end
        if quotient == 0
          quotient = entity_hash[child['id']]
        else
          puts "???: #{quotient} #{entity_hash[child['id']]}"
          quotient = ( quotient / entity_hash[child['id']] )
        end
      end
      aggregation[entity] = quotient
    end
    aggregation
  end



  # Normalizes and weights a node for aggregation during
  # score tree traversal.
  #
  # @param [Hash] node: the node to score
  # @param [Hash] normalized: current set of normalized score points
  # @return [Hash] updated normalized cache for traversal
  def score_node( node, normalized )
    if node['parent_id'] == 0
      normalized = rank_scale_root( node, normalized )
    elsif node['children'].length == 0
      normalized = score_base_node( node, normalized )
    else
      normalized = score_aggregate_node( node, normalized )
    end
    normalized
  end

  # Normalizes the root score node score.
  #
  # @param [Hash] node: the root node
  # @param [Hash] normalized: cached data hash
  # @return [Hash] updated data hash
  def rank_scale_root( node, normalized )
    unranked_score = score_aggregate_node( node, normalized, false )
    rank_list = unranked_score.values.sort.uniq

    unranked_score.keys.each do |key|
      normalized[key][node['id']] = ( rank_list.index( unranked_score[key] ) + 1 ) / rank_list.size.to_f
    end
    normalized
  end

  # Recursive tree traversal to normalize data at each node.
  #
  # @param [Hash] node: the current tree node
  # @param [Hash] normalized: normalized data hash
  # @return [Hash] finalized data hash
  def traverse( node, normalized )
    node['children'].each do |c|
      traverse( c, normalized )
    end
    normalized = score_node( node, normalized )
  end

  # Traversal wrapper.
  #
  # @return [Hash] computed data set
  def calculate_scores
    traverse( @tree, Hash.new )
  end

  # Calculate & cache z-scores for all metrics to speed up
  # score calculations.  Must be executed whenever new data added.
  #
  # @return nil
  def self.cache_z_scores( score = nil )
    metrics = []
    if score.nil?
      metrics = Metric.pluck(:metric).uniq
    else
      metrics = ScoreEngine.metrics_for_score(score)
    end
    metrics.each do |m|
      values = Metric.where(:metric => m).pluck(:value)
      mean = values.sum / values.size.to_f
      stdev = ScoreEngine.standard_deviation(mean, values)
      Metric.where(:metric => m).each do |mm|
        mm.norm_value = ScoreEngine.z_score(mm.value, mean, stdev)
        mm.save
      end
    end
  end

  def self.metrics_for_score( score )
    metrics = []
    score.score['nodeDataArray'].each do |n|
      if n['mode'] == 'value'
        metrics.push(n['dataname'])
      end
    end
    return metrics
  end

  # Cache the rank for all of the current metrics
  #
  # @return [nil]
  def self.cache_metric_rank( score = nil )
    metrics = []
    if score.nil?
      metrics = Metric.pluc(:metric).uniq
    else
      metrics = ScoreEngine.metrics_for_score(score)
    end
    metrics.each do |m|
      values = Metric.where(:metric => m).pluck(:norm_value)
      Metric.where(:metric => m).each do |mm|
        mm.rank = ScoreEngine.rank(mm.norm_value, values)
        mm.save
      end
    end
  end

  # Cache the porfolio score for owned assets
  #
  # @param [String] metric_name: the metric to cache
  # @return [nil]
  def self.cache_portfolio_score( metric_name )
    sum = 0
    count = 0
    Asset.where( :active => true, :owned => true ).each do |a|
      puts "Assee: #{a.name}"
      metric = a.metrics.where( :metric => metric_name ).first
      sum += metric.value
      count += 1
    end
    average = sum / count.to_f
    portfolio_score = Metric.where(:entity_key => 'portfolio', :metric => "portfolio_#{metric_name}").first
    if not portfolio_score.nil?
      portfolio_score.delete
    end
    Metric.new(
      :entity_key => 'portfolio',
      :entity_type => 'portfolio',
      :source => 'score',
      :value => average,
      :metric => "portfolio_#{metric_name}",
      :icon => '/metrics/score.png'
    ).save
  end

  # Cache the portfolio performnace score for owned assets
  #
  # @return [nil]
  def self.cache_portfolio_performance_score
    ScoreEngine.cache_portfolio_score( 'performance_score' )
  end

  # Cache the portfolio passion score for owned assets.
  #
  # @return [nil]
  def self.cache_portfolio_passion_score
    ScoreEngine.cache_portfolio_score( 'passion_score' )
  end

  # Calculates the standard deviation.
  #
  # @param [Float] mean: the mean
  # @param [Array] list: list of values in the set
  # @return [Float] the standard deviation
  def self.standard_deviation( mean, list )
    tmp = []
    list.each do |i|
      tmp.push( ( i-mean ) ** 2 )
    end
    Math.sqrt( tmp.sum / tmp.size.to_f )
  end

  # Determine rank for each metric
  #
  # @param [Decimal] metric: the metric to rank
  # @param [Array] list: the list to rank against
  # @return [Decimal] the ranked metric
  def self.rank( metric, list )
    rank_list = list.sort.uniq
    ( ( rank_list.index( metric ) + 1 ) / rank_list.size.to_f )
  end

  # Calculates the z-score.
  #
  # @param [Float] val: the value to normalize
  # @param [Float] mean: the mean
  # @param [Float] stdev: the standard deviation
  # @return [Float] the val z-score
  def self.z_score( val, mean, stdev )
    ( val - mean ) / stdev
  end

end
