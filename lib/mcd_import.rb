class McdImport


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
