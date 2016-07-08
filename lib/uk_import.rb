class UkImport

  def self.import_metrics
    Metric.delete_all
    Spreadsheet.client_encoding = 'UTF-8'
    book = Spreadsheet.open Rails.root.join('import', 'uk_data.xls')
    active_sheets = [1]
    active_sheets.each do |as|
      sheet = book.worksheet as
      headings = sheet.row(0)
      headings.delete_at(0)
      headings.delete_at(0)
      headings.delete_at(0)
      headings.delete_at(0)

      sheet.each 1 do |row|
        i = 4
        headings.each do |h|
          m = Metric.new(
            :entity_key => row[0].strip.split(" ").join("_").downcase,
            :entity_type => 'asset',
            :metric => h,
            :value => row[i]
          )
          if h.include? "twitter_handle"
            puts "skip"
          elsif h.include? "twitter"
            m.icon = '/metrics/twitter.png'
            m.source = 'twitter'
            m.save
          elsif h.include? "facebook"
            m.icon = '/metrics/facebook.png'
            m.source = 'facebook'
            m.save
          elsif h.include? "google"
            m.icon = '/metrics/google.png'
            m.source = 'google'
            m.save
          elsif h.include? "instagram"
            m.icon = '/metrics/instagram.png'
            m.source = 'instagram'
            m.save
          elsif h.include? "klout"
            m.icon = '/metrics/klout.png'
            m.source = 'klout'
            m.save
          elsif h.include? "latitude"
            puts "skip"
          elsif h.include? "longitude"
            puts "skip"
          elsif h.include? "image_url"
            puts "skip"
          else
            m.icon = '/metrics/team.png'
            m.source = 'team'
            m.save
          end
          i += 1
        end
      end

    end
  end

  def self.import_assets
    Spreadsheet.client_encoding = 'UTF-8'
    book = Spreadsheet.open Rails.root.join('import', 'uk_data.xls')
    active_sheets = [1]
    active_sheets.each do |as|
      sheet = book.worksheet as
      sheet.each 1 do |row|
        Asset.new(
          :name => row[0].strip,
          :scope => "Regional",
          :category => "Sports Team",
          :entity_key => row[0].strip.split(" ").join("_").downcase,
          :active => true,
          :subcategory => row[1],
          :twitter_handle => row[17],
          :klout_score => row[37],
          :latitude => row[48],
          :longitude => row[49],
          :image_url => row[10],
          :image => row[10]
        ).save
      end
    end
  end
end
