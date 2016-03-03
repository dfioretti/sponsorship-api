class CustomComponent < ActiveRecord::Base

  def buildPieChartData
    if self.id == 5
      data = []
      data.push({ :label => "MLB", :value => 434324})
      data.push({ :label => "NHL", :value => 228903})
      data.push({ :label => "NFL", :value => 728903})
      data.push({ :label => "NBA", :value => 328903})
      return data
    elsif self.id == 6
      data = []
      data.push({ :label => "Facebook", :value => rand(4000000..7000000)})
      data.push({ :label => "Twitter", :value => rand(900000..1500000)})
      data.push({ :label => "Instagram", :value => rand(700000..1200000)})
      data.push({ :label => "Google+", :value => rand(300000..700000)})
      return data
    end
  end

  def buildSingleAssetTrend
    a = 3.month.ago.strftime("%m-%y")
    b = 6.month.ago.strftime("%m-%y")
    c = 12.month.ago.strftime("%m-%y")
    d = 15.month.ago.strftime("%m-%y")
    e = 18.month.ago.strftime("%m-%y")
    f = 21.month.ago.strftime("%m-%y")
    labels = [f, e, d, c, b, a]
    chartData = []
    passion_score = []
    6.times do |i|
      passion_score.push(rand(76..95))
    end
    performance = []
    6.times do |i|
      performance.push(rand(54..75))
    end
    special = []
    6.times do |i|
      special.push(rand(69..88))
    end
    chartData.push(passion_score)
    chartData.push(performance)
    chartData.push(special)
    assets = ["Passion", "Performance", "Fan Engagement"]
    ret = {
      :labels => labels,
      :assets => assets,
      :chartData => chartData,
      :minValue => 65,
      :maxValue => 100
    }
    return ret
  end

  def buildLineChartData
    chartData = []
    labels = []
    assets = []
    self.data.each do |d|
      asset = Asset.find(d['asset_id'])
      assets.push(asset.name.split.last)
      asset_data = []
      6.times do |i|
        asset_data.push(rand(76..95))
      end
      chartData.push(asset_data)
    end

    a = 1.month.ago.strftime("%m-%y")
    b = 2.month.ago.strftime("%m-%y")
    c = 3.month.ago.strftime("%m-%y")
    d = 4.month.ago.strftime("%m-%y")
    e = 5.month.ago.strftime("%m-%y")
    f = 6.month.ago.strftime("%m-%y")
    labels = [f, e, d, c, b, a]
    #assets = ["Braves", "Orioles", "Dodgers"]
    #chartData = []
    #chartData.push([ 92.3, 84.4, 84.1, 98.2, 58.2, 87.4])
    #chartData.push([ 72.3, 74.4, 74.1, 78.2, 88.2, 97.4])
    #chartData.push([ 52.3, 44.4, 64.1, 68.2, 38.2, 67.4])
    ret = {
      :labels => labels,
      :assets => assets,
      :chartData => chartData,
      :minValue => 65,
      :maxValue => 100
    }
    return ret
  end

  def buildValueListData
    ret = []
    self.data.each do |d|
      Rails.logger.debug(d.to_s)
      item = {}
      asset = Asset.find(d['asset_id'])
      item['name'] = asset.name
      item['image'] = "/images/#{asset.id}.jpg"
      item['asset_id'] = asset.id
      item['metric'] = rand(85..99)
      item['trend'] = rand(-1..1)
      if item['trend'] == 0
        item['trend'] = 1
      end
      ret.push(item)
    end
    return ret
  end


  def self.setup_custom_componenet
    c = CustomComponent.new
    c.dashboard_id = 341
    c.name = "Test Custom Component"
    c.asset_set_id = 2
    c.view = "lineChart"
    c.interval = "weekly"
    data = [
      {
        :asset_id => 1226,
        :data_metric => "facebook_fans"
      },
      {
        :asset_id => 1261,
        :data_metric => "facebook_fans"
      },
      {
        :asset_id => 1212,
        :data_metric => "facebook_fans",
      },
      {
        :asset_id => 1260,
        :data_metric => "facebook_fans",
      },
      {
        :asset_id => 1233,
        :data_metric => "facebook_fans"
      }
    ]
    c.data = data
    c.save
  end

  def self.creat_value_list
    c = CustomComponent.find(2)
    data = [
      {
        :asset_id => 1057,
        :data_metric => :national_performance_score
      },
      {
        :asset_id => 1265,
        :data_metric => :national_performance_score
      },
      {
        :asset_id => 1132,
        :data_metric => :national_performance_score
      },
      {
        :asset_id => 1250,
        :data_metric => :national_performance_score
      },
      {
        :asset_id => 1262,
        :data_metric => :national_performance_score
      }
    ]
    c.data = data
    c.save
  end
end
