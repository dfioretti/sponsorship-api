class ScoreEngine
	attr_accessor :score, :nodes, :tree

	# Constructor, initialize score model data.
	#
	# @param [Int] score_id: the idea of the model to score
	# @return [ScoreEngine] the ScoreEngine instance
	def initialize( score_id )
		@score = Score.find(score_id)
		@nodes = @score.score['nodeDataArray']
		@tree = build_score_tree
	end

	def self.test_score
		s = ScoreEngine.new(25)
		s.in_order_traversal
	end

	# Extract relevant data from model to build
	# score tree.
	#
	# @param [Hash] n: the node to build
	# @return [Hash] tree node
	def build_node_from_model(n)
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
	def score_base_node(node, normalized)
		Asset.where(:active => true).each do |a|
			metric = a.metrics.where(:metric => node['metric']).first
			entity_hash = normalized[a.entity_key]
			if entity_hash.nil?
				entity_hash = Hash.new
			end
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
	def score_aggregate_node(node, normalized)
		aggregation = Hash.new
		case node['operation']
		when 'SUM'
			aggregation = sum_aggregation(node, normalized)
		end
		z_scores = z_score(aggregation)
		normalized.keys.each do |key|
			normalized[key][node['id']] = node['weight'] * z_scores[key]
		end
		normalized
	end

	# Calculates the z-scores for a set of values.
	#
	# @param [Hash] aggregation: set of aggregated child scores
	# @return [Hash] z-scores for the aggregation
	def z_score(aggregation)
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
	def sum_aggregation(node, normalized)
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

	# Normalizes and weights a node for aggregation during
	# score tree traversal.
	#
	# @param [Hash] node: the node to score
	# @param [Hash] normalized: current set of normalized score points
	# @return [Hash] updated normalized cache for traversal
	def score_node(node, normalized)
		if node['parent_id'] == 0
			normalized = rank_scale_root(node, normalized)
		elsif node['children'].length == 0
			normalized = score_base_node(node, normalized)
		else
			normalized = score_aggregate_node(node, normalized)
		end
		normalized
	end

	# Normalizes the root score node score.
	#
	# @param [Hash] node: the root node
	# @param [Hash] normalized cached data hash
	# @return [Hash] updated data hash
	def rank_scale_root(node, normalized)
		unranked_score = sum_aggregation(node, normalized)
		rank_list = unranked_score.values.sort.uniq

		unranked_score.keys.each do |key|
			normalized[key][node['id']] = (rank_list.index(unranked_score[key]) + 1) / rank_list.size.to_f
		end
		normalized
	end

	# Recursive tree traversal to normalize data at each node.
	#
	# @param [Hash] node: the current tree node
	# @param [Hash] normalized: normalized data hash
	# @return [Hash] finalized data hash
	def traverse(node, normalized)
		node['children'].each do |c|
			traverse(c, normalized)
		end
		normalized = score_node(node, normalized)
	end


	# Traversal wrapper.
	#
	# @return [] description of returned object
	def calculate_scores
		out = traverse(@tree, Hash.new)
		return out[0]
	end

	def get_tree
		return @tree
	end

	def self.passion_score
		social_reach = Hash.new
		avidity = Hash.new

		# calculate tier 2
		Asset.where(:active => true).each do |a|
			fb_reach = 0.25 * a.metrics.where(:metric => 'facebook_likes').first.norm_value
			tw_reach = 0.5 * a.metrics.where(:metric => 'twitter_followers').first.norm_value
			ins_reach = 0.25 * a.metrics.where(:metric => 'instagram_followers').first.norm_value
			social_reach[a.entity_key] = (fb_reach + ins_reach + tw_reach)

			avid = 0.7 * a.metrics.where(:metric => 'avid_fan_index').first.norm_value
			casual = 0.3 * a.metrics.where(:metric => 'casual_fan_index').first.norm_value
			avidity[a.entity_key] = (avid + casual)
		end

		avid_mean = avidity.values.sum / avidity.values.size.to_f
		avid_stdev = ScoreEngine.standard_deviation(avid_mean, avidity.values)
		social_mean = social_reach.values.sum / social_reach.values.size.to_f
		social_stdev = ScoreEngine.standard_deviation(social_mean, social_reach.values)

		# calculate root
		derived_z = Hash.new
		social_reach.keys.each do |asset|
			avid_z = ScoreEngine.z_score(avidity[asset], avid_mean, avid_stdev)
			social_z = ScoreEngine.z_score(social_reach[asset], social_mean, social_stdev)
			derived_z[asset] = (0.4 * avid_z) + (0.6 * social_z)
		end

		# normalize root
		rank = Hash.new
		sorted_z = derived_z.values.sort.uniq
		derived_z.keys.each do |k|
			rank[k] = (sorted_z.index(derived_z[k]) + 1) / sorted_z.size.to_f
		end
		rank.keys.each do |r|
			Metric.new(
				:entity_key => r,
				:source => "score",
				:metric => 'passion_score',
				:value => rank[r],
				:icon => '/metrics/score.png'
			).save
		end
		return rank
	end

	# calculate and save norm_value for all data points
	def self.cache_z_scores
		Metric.pluck(:metric).uniq.each do |m|
			values = Metric.where(:metric => m).pluck(:value)
			mean = values.sum / values.size.to_f
			stdev = ScoreEngine.standard_deviation(mean, values)
			Metric.where(:metric => m).each do |mm|
				mm.norm_value = ScoreEngine.z_score(mm.value, mean, stdev)
				mm.save
			end
		end
	end

	def self.standard_deviation(mean, list)
		tmp = []
		list.each do |i|
			tmp.push((i-mean) ** 2)
		end
		Math.sqrt(tmp.sum / tmp.size.to_f)
	end

	def self.z_score(val, mean, stdev)
		(val - mean) / stdev
	end
end
