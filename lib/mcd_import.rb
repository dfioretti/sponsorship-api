class McdImport

  def self.generate(start, entity, metric, values)
    h = Historical.new
    h.entity_key = entity
    h.metric = metric
    h.data = Hash.new
    values.each do |v|
      h.data[start] = v
      start += 1
    end
    h.save
  end

  def self.load_more(start)
    book = Spreadsheet.open Rails.root.join('import', 'trend.xls')
    sheet = book.worksheet 0
    fire = {}

    x = 1
    while x < 61
      fire[sheet[0, x]] = sheet[start, x]
      x += 1
    end

    keys = fire.keys
    values = fire.values

    clean = Hash.new

    (0..keys.length - 1).each do |i|
      puts "wtf #{i} #{keys} #{values}"
      toks = keys[i].strip.split('_')
      toks.delete_at(0)
      key = toks.join("_")
      if clean.has_key?(key)
        clean[key].push(values[i])
      else
        clean[key] = []
        clean[key].push(values[i])
      end
    end
    puts clean
    return clean

  end

  def self.create_wal
    # 2015 from http://www.chicagobusiness.com/article/20151214/BLOGS04/151219936/chicago-sports-fan-bases-in-2015
    # and coke fand base for others
    entities = ['chicago_cubs', 'chicago_bears', 'chicago_bulls', 'chicago_white_sox', 'chicago_blackhawks', 'chicago_fire', 'chicago_sky', 'illinois_ncaaf', 'illinois_ncaab', 'northwestern_ncaaf', 'northwestern_ncaab']
    wal = [0.44, 0.58, 0.45, 0.37, 0.49, 0.073, 0.03, 0.114, 0.107, 0.096, 0.072]
    
    (0..11).each do |i|
      Metric.new(
        :entity_key => entities[i],
        :entity_type => 'asset',
        :source => 'scarborough',
        :metric => 'wal_percent',
        :value => wal[i],
        :icon => '/metrics/scarborough.png'
      ).save
    end

  end
  def self.load_bulls
    att = [849760	,893462	,731326	,890370	,875091	,632146	]
    fci = [389	,365	,393.98	,426.6	,456.6	,477.32	]
    tp = [64.25	,64.25	,68.37	,71.9	,77.65	,82.33 ]
    pay = [69219401,	53658187	,68904547	,74258006	,71043080	,66881435]
    win = [0.5,	0.756,	0.758	,0.549	,0.585	,0.61]
    val = [511000000	,600000000	,800000000	,1000000000	,2000000000	,2300000000]
    rev = [169000000	,185000000	,162000000	,195000000	,201000000	,228000000]
    inc = [51300000	,59400000	,34200000	,52200000	,65300000	,67600000]
    McdImport.generate(2010, 'chicago_bulls', 'attendance', att)
    McdImport.generate(2009, 'chicago_bulls', 'fci', fci)
    McdImport.generate(2009, 'chicago_bulls', 'ticket_price', tp)
    McdImport.generate(2010, 'chicago_bulls', 'payroll', pay)
    McdImport.generate(2009, 'chicago_bulls', 'winning', win)
    McdImport.generate(2010, 'chicago_bulls', 'value', val)
    McdImport.generate(2010, 'chicago_bulls', 'revenue', rev)
    McdImport.generate(2010, 'chicago_bulls', 'income', inc)

  end

  def self.load_historical_nhl_nfl
    att = [497561	,497166	,498633	,498864	,493449	,496287	]
    fci = [523.2,	557.18	,608.64	,577.42	,596.76	,601.2]	
    tp = [93.55	,101.55	,110.91	,103.6	,108.44	,108.44	]
    pay = [120065819	,101032032	,126358124	,125949632	,113902499	,110914091	]
    win = [0.688	,0.5	,0.625	,0.5	,0.313	,0.375	]
    val = [1067000000	,1093000000	,1190000000	,1252000000	,1700000000	,2450000000	]
    rev = [254000000	,266000000	,286000000	,298000000	,309000000	,352000000	]
    inc = [37300000	,43400000	,27000000	,63200000	,57100000	,85700000		]
    McdImport.generate(2010, 'chicago_bears', 'attendance', att)
    McdImport.generate(2010, 'chicago_bears', 'fci', fci)
    McdImport.generate(2010, 'chicago_bears', 'ticket_price', tp)
    McdImport.generate(2010, 'chicago_bears', 'payroll', pay)
    McdImport.generate(2010, 'chicago_bears', 'winning', win)
    McdImport.generate(2010, 'chicago_bears', 'value', val)
    McdImport.generate(2010, 'chicago_bears', 'revenue', rev)
    McdImport.generate(2010, 'chicago_bears', 'income', inc)
    att = [854267	,878356	,882874	,522619	,927545	,892532	]
    fci = [312.38	,319.21	,350.58	,367.38	,396.03	,437.8	,463.2]
    tp = [46.78209459,	55.39	,55.72	,62.88	,72.95	,78.8]	
    pay = [62502857	,69490000	,69282500	,60425000	,73122500	,80850000	]
    win = [0.634146341	,0.536585366	,0.548780488	,0.75	,0.56097561	,0.585365854	]
    val = [258000000	,300000000	,306000000	,350000000	,625000000	,925000000	]
    rev = [108000000,	120000000	,118000000	,125000000	,115000000	,182000000	]
    inc = [20900000	,17600000	,8700000	,20500000	,25600000	,44800000]
    McdImport.generate(2009, 'chicago_blackhawks', 'attendance', att)
    McdImport.generate(2009, 'chicago_blackhawks', 'fci', fci)
    McdImport.generate(2010, 'chicago_blackhawks', 'ticket_price', tp)
    McdImport.generate(2010, 'chicago_blackhawks', 'payroll', pay)
    McdImport.generate(2009, 'chicago_blackhawks', 'winning', win)
    McdImport.generate(2010, 'chicago_blackhawks', 'value', val)
    McdImport.generate(2010, 'chicago_blackhawks', 'revenue', rev)
    McdImport.generate(2010, 'chicago_blackhawks', 'income', inc)

  end
  def self.load_historicals_teams
    att = [3062973, 3017966, 2882756, 2642682, 2652113, 2959812]
    fci = [329.74	,305.6	,300.29	,298.2	,304.64	,300.73	]
    tp = [52.56	,46.9	,46.3	,44.55	,44.16	,44.81	]
    pay = [146609000	,125047329	,88197033	,104150726	,89007857	,119006885	]
    win = [0.463	,0.438	,0.377	,0.407	,0.451	,0.599	]
    val = [726000000	,773000000	,879000000	,1000000000	,1200000000	,1800000000	]
    rev = [246000000	,25000000	,266000000	,274000000	,266000000	,302000000	]
    inc = [25500000	,23400000	,28100000	,32100000	,27300000	,73300000]

    McdImport.generate(2010, 'chicago_cubs', 'attendance', att)
    McdImport.generate(2010, 'chicago_cubs', 'fci', fci)
    McdImport.generate(2010, 'chicago_cubs', 'ticket_price', tp)
    McdImport.generate(2010, 'chicago_cubs', 'payroll', pay)
    McdImport.generate(2010, 'chicago_cubs', 'winning', win)
    McdImport.generate(2010, 'chicago_cubs', 'value', val)
    McdImport.generate(2010, 'chicago_cubs', 'revenue', rev)
    McdImport.generate(2010, 'chicago_cubs', 'income', inc)
    att = [2194378	,2001117	,1965955	,1768413	,1650821	,1755810	]
    fci = [249.6,	258.68	,222.98	,210.18	,210.18	,208.18	]
    tp = [38.65	,40.67	,29	,26.05	,26.05	,26.05	]
    pay = [105530000	,127789000	,96919500	,124065277	,91159254	,115238678	]
    win = [0.543	,0.488	,0.525	,0.389	,0.451	,0.469	]
    val = [466000000	,526000000	,600000000	,692000000	,695000000	,975000000	]
    rev = [194000000,	210000000	,214000000	,216000000	,210000000	,227000000	]
    inc = [26400000	,27600000	,10700000	,22900000	,27000000	,31900000]
    McdImport.generate(2010, 'chicago_white_sox', 'attendance', att)
    McdImport.generate(2010, 'chicago_white_sox', 'fci', fci)
    McdImport.generate(2010, 'chicago_white_sox', 'ticket_price', tp)
    McdImport.generate(2010, 'chicago_white_sox', 'payroll', pay)
    McdImport.generate(2010, 'chicago_white_sox', 'winning', win)
    McdImport.generate(2010, 'chicago_white_sox', 'value', val)
    McdImport.generate(2010, 'chicago_white_sox', 'revenue', rev)
    McdImport.generate(2010, 'chicago_white_sox', 'income', inc)

  end
  def self.load_historicals_bears
    h = Historical.new
    h.entity_key = 'chicago_bears'
    h.metric = 'attendance'
    h.data = Hash.new
    h.data[2010] = 497561
    h.data[2011] = 497166
    h.data[2012] = 498633
    h.data[2013] = 498864
    h.data[2014] = 493449
    h.data[2015] = 496287
    h.save

    h = h.dup
    h.metric = 'fci'
    h.data = Hash.new
    h.data[2010] = 523.2
    h.data[2011] = 557.18
    h.data[2012] = 608.64
    h.data[2013] = 577.42
    h.data[2014] = 596.42
    h.data[2015] = 601.2
    h.save

    h = h.dup
    h.metric = "ticket_price"
    h.data = Hash.new
    h.data[2010] = 93.55
    h.data[2011] = 101.55
    h.data[2012] = 110.91
    h.data[2013] = 103.6
    h.data[2014] = 108.44
    h.data[2015] = 108.44
    h.save

    h = h.dup
    h.metric = 'payroll'
    h.data = Hash.new
    h.data[2010] = 120065819
    h.data[2011] = 101032032
    h.data[2012] = 126358124
    h.data[2013] = 125949632
    h.data[2014] = 113902499
    h.data[2015] = 110914091
    h.save

    h = h.dup
    h.metric = 'winning'
    h.data = Hash.new
    h.data[2010] = 0.688
    h.data[2011] = 0.5
    h.data[2012] = 0.625
    h.data[2013] = 0.5
    h.data[2014] = 0.313
    h.data[2015] = 0.375
    h.save

    h = h.dup
    h.metric = 'value'
    h.data = Hash.new
    h.data[2010] = 1067000000
    h.data[2011] = 1093000000
    h.data[2012] = 1190000000
    h.data[2013] = 1252000000
    h.data[2014] = 1700000000
    h.data[2015] = 2450000000
    h.save

    h = h.dup
    h.metric = 'revenue'
    h.data = Hash.new
    h.data[2010] = 254000000
    h.data[2011] = 266000000
    h.data[2012] = 286000000
    h.data[2013] = 298000000
    h.data[2014] = 309000000
    h.data[2015] = 352000000
    h.save

    h = h.dup
    h.metric = 'income'
    h.data = Hash.new
    h.data[2010] = 37300000
    h.data[2011] = 43400000
    h.data[2012] = 27000000
    h.data[2013] = 63200000
    h.data[2014] = 57100000
    h.data[2015] = 85700000
    h.save

  end

  def self.port_metrics(metrics)
    metrics.each do |m|
      n = m.dup
      n.save
    end
  end

  def self.upload_pull
    fb = [ "facebook_lkes", "facebook_talking_about", "facebook_posts_per_day", "facebook_engagement_per_post" ]
    tw = [ "twitter_followers", "twitter_favorited_percent", "twitter_replies_percent", "twitter_retweeted_percent" ]
    ins = [ "instagram_followers", "instagram_posts" ]
    g = [ "google_followers", "google_views" ]
    att = ["total_attendance", "average_attendance", "attendance_percent"]

  end

  def self.upload_social
    Spreadsheet.client_encoding = 'UTF-8'
    book = Spreadsheet.open Rails.root.join('import', 'datum_mcd.xls')
    sheet = book.worksheet 4
    headings = sheet.row(0)
    headings.delete_at(0)

    sheet.each 1 do |row|
      i = 1
      headings.each do |h|
        m = Metric.new(
          :entity_key => row[0],
          :entity_type => 'asset',
          :metric => h,
          :value => row[i]
        )
        if h.include? 'twitter'
          m.icon = '/metrics/twitter.png'
          m.source = 'twitter'
          m.save
        elsif h.include? 'facebook'
          m.icon = '/metrics/facebook.png'
          m.source = 'facebook'
          m.save
        elsif h.include? 'instagram'
          m.icon = '/metrics/instagram.png'
          m.source = 'instagram'
          m.save
        elsif h.include? 'google'
          m.icon = '/metrics/google.png'
          m.source = 'google'
          m.save
        else
          m.icon = '/metrics/team.png'
          m.source = 'team'
          m.save
        end
        i += 1
      end
    end
  end
  
  def self.create_datum
    Spreadsheet.client_encoding = 'UTF-8'
    book = Spreadsheet.open Rails.root.join('import', 'datum_mcd.xls')
    sheet = book.worksheet 0
    sheet.each do |row|
      Datum.new(
        :source => row[0],
        :kind => row[1],
        :icon => row[2],
        :point => row[3]
      ).save
    end
  end

  def self.import_main_data
    Metric.delete_all
    Spreadsheet.client_encoding = 'UTF-8'
    book = Spreadsheet.open Rails.root.join('import', 'datum_mcd.xls')
    sheet = book.worksheet 1
  
    sheet.each 1 do |row|
      Metric.new(
        :entity_key => 'chicago_cubs',
        :entity_type => 'asset',
        :metric => row[1],
        :source => row[0],
        :icon => "/metrics/#{row[0]}.png",
        :value => row[2]
      ).save
      Metric.new(
        :entity_key => 'chicago_white_sox',
        :entity_type => 'asset',
        :metric => row[1],
        :source => row[0],
        :icon => "/metrics/#{row[0]}.png",
        :value => row[3]
      ).save
      Metric.new(
        :entity_key => 'chicago_bears',
        :entity_type => 'asset',
        :metric => row[1],
        :source => row[0],
        :icon => "/metrics/#{row[0]}.png",
        :value => row[4]
      ).save
      Metric.new(
        :entity_key => 'chicago_bulls',
        :entity_type => 'asset',
        :metric => row[1],
        :source => row[0],
        :icon => "/metrics/#{row[0]}.png",
        :value => row[5]
      ).save
      Metric.new(
        :entity_key => 'chicago_blackhawks',
        :entity_type => 'asset',
        :metric => row[1],
        :source => row[0],
        :icon => "/metrics/#{row[0]}.png",
        :value => row[6]
      ).save
    end
  end


  def self.import_market_summaries
    Spreadsheet.client_encoding = 'UTF-8'
    book = Spreadsheet.open Rails.root.join('import', 'market_summaries.xls')
    sheets = [0]
    sheets.each do |s|
      sheet = book.worksheet s
      sheet.each 4 do |row|
        Metric.new(
          :entity_key => "mlb",
          :entity_type => "league",
          :source => 'sbrnet',
          :icon => '/metrics/sbrnet',
          :metric => "#{row[0].strip.split(' ').join("_").downcase}_2011",
          :value => row[15]
        ).save
        Metric.new(
          :entity_key => "mlb",
          :entity_type => "league",
          :source => 'sbrnet',
          :icon => '/metrics/sbrnet',
          :metric => "#{row[0].strip.split(' ').join("_").downcase}_2012",
          :value => row[16]
        ).save
        Metric.new(
          :entity_key => "mlb",
          :entity_type => "league",
          :source => 'sbrnet',
          :icon => '/metrics/sbrnet',
          :metric => "#{row[0].strip.split(' ').join("_").downcase}_2013",
          :value => row[17]
        ).save
        Metric.new(
          :entity_key => "mlb",
          :entity_type => "league",
          :source => 'sbrnet',
          :icon => '/metrics/sbrnet',
          :metric => "#{row[0].strip.split(' ').join("_").downcase}_2014",
          :value => row[18]
        ).save
        Metric.new(
          :entity_key => "mlb",
          :entity_type => "league",
          :source => 'sbrnet',
          :icon => '/metrics/sbrnet',
          :metric => "#{row[0].strip.split(' ').join("_").downcase}_2015",
          :value => row[19]
        ).save
      end
    end
  end
end
