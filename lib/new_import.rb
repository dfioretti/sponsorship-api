class NewImport





  def self.import_teams
    Spreadsheet.client_encoding = 'UTF-8'
    book = Spreadsheet.open Rails.root.join('import', 'datum_mcd.xls')
    sheet = book.worksheet 5
    sheet.each 1 do |row|
      NewImport.create_asset(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8])
    end
    #metrics = sheet.row(0)
    #9.times.metrics.delete_at(0)

    sheet.each 1 do |row|
      (9..row.length).each do |i|
        #NewImport.metric_for_kind(sheet.row(0)[i], row[1], row[i])
      end
    end
  end


  def self.import_more_metrics
    Spreadsheet.client_encoding = 'UTF-8'
    book = Spreadsheet.open Rails.root.join('import', 'datum_mcd.xls')
    sheet = book.worksheet 0
    imports = ['chicago_sky', 'chicago_fire', 'northwestern_ncaab', 'northwestern_ncaaf', 'illinois_ncaaf', 'illinois_ncaab']
    x = 2
    while x < 28
      y = 1
      while y < 39
        team = sheet[0, x]
        source = sheet[y, 0]
        metric = sheet[y, 1]
        value = sheet[y, x]
        #puts "! #{x} #{y} #{value} #{source} #{metric} #{team}"
        if imports.include? team
          NewImport.create_metric(source, metric, team, value)
        end
        y += 1
      end
      x += 1
    end
=begin
    sheet.column(2).each do |col|
      puts "$$ #{col}"
      puts "#{col.inspect}"
      team = col[0]
      (1..39).each do |i|
        source = sheet[0, i]
        metric = sheet[1, i]
        puts "&& #{team} #{source} #{metric}"
      end
    end
=begin
    (2..27).each do |index|
      sources = sheet.columns[0]
      metrics = sheet.columns[1]
      team = sheet.row(0)[index]
      sheet.column(index).each do |col|
        val = col
        if team == 'chicago_sky'
          puts "!! #{val} "
          NewImport.create_metric(sources[i], metrics[i], team, sheet.columns[index][i])
        elsif team == 'chicago_fire'
        elsif team == 'northwestern_ncaab'
        elsif team == 'northwestern_ncaaf'
        elsif team == 'illinois_ncaaf'
        elsif team == 'illinois_ncaab'
        end
      end
    end
=end
  end

  def self.import_playoffs
    NewImport.create_metric('team', 'playoff_appearances', 'chicago_bulls', 15)
    NewImport.create_metric('team', 'playoff_appearances', 'chicago_blackhawks', 39)
    NewImport.create_metric('team', 'playoff_appearances', 'chicago_white_sox', 0)
    NewImport.create_metric('team', 'playoff_appearances', 'chicago_cubs', 6)
    NewImport.create_metric('team', 'playoff_appearances', 'chicago_bears', 3)
    NewImport.create_metric('team', 'playoff_appearances', 'chicago_fire', 1)
    NewImport.create_metric('team', 'playoff_appearances', 'chicago_sky', 8)
    NewImport.create_metric('team', 'playoff_appearances', 'illinois_ncaaf', 3)
    NewImport.create_metric('team', 'playoff_appearances', 'illinois_ncaab', 15)
    NewImport.create_metric('team', 'playoff_appearances', 'northwestern_ncaaf', 4)
    NewImport.create_metric('team', 'playoff_appearances', 'northwestern_ncaab', 13)
  end

  def self.create_metric(source, metric, key, value)
    if value.nil?
      puts "## #{source} #{metric} #{key}"
      return
    end
    Metric.new(
      :entity_key => key,
      :entity_type => 'asset',
      :metric => metric,
      :value => value,
      :source => source,
      :rank => -200.0, #incase i need to roll it back
      :icon => "/metrics/#{source}.png"
    ).save
  end

  def self.metric_for_kind(metric, key, value)
    if metric.nil? 
      return
    end
    puts "!!! #{metric} #{key} #{value}"
    #Metric.find_by_metric(metric).nil? throw "Fuck #{metric}"
    test = Metric.find_by_metric(metric)
    puts "%%% #{test}"
    if test == nil
      puts "huh"
    end
    m = Metric.new(
      :entity_key => key,
      :entity_type => 'asset',
      :metric => metric,
      :value => value,
      :rank => -100.0
    )
    if metric.include? 'facebook'
      m.icon = '/metrics/facebook.png'
      m.source = 'facebook'
    elsif metric.include? 'twitter'
      m.icon = '/metrics/twitter.png'
      m.source = 'twitter'
    elsif metric.include? 'instagram'
      m.icon = '/metrics/instagram.png'
      m.source = 'instagram'
    elsif metric.include? 'google'
      m.icon = '/metrics/google.png'
      m.source = 'google'
    elsif metric.include? 'klout'
      m.icon = '/metrics/klout.png'
      m.source = 'klout'
    else
      m.icon = '/metrics/team.png'
      m.source = 'team'
    end
    m.save
  end

  def self.create_asset(name, entity_key, description, subcategory, image_url, facebook_page, twitter_handle, lat, long)
    Asset.new(
      :name => name,
      :entity_key => entity_key,
      :latitude => lat,
      :subcategory => subcategory,
      :description => description,
      :longitude => long,
      :facebook_page => facebook_page,
      :category => "Sports Team",
      :scope => "Regional",
      :twitter_handle => twitter_handle,
      :image_url => image_url,
      :image => image_url,
      :active => true,
      :owned => true
    ).save
  end
end
