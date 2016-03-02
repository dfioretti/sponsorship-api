class CustomComponent < ActiveRecord::Base

  def buildLineChartData
    labels = ["1" , "2", "3", "4", "5", "6"]
    assets = ["David Fioretti", "Another Guy", "Dude"]
    chartData = []
    chartData.push([ 92.3, 84.4, 84.1, 98.2, 58.2, 87.4])
    chartData.push([ 72.3, 74.4, 74.1, 78.2, 88.2, 97.4])
    chartData.push([ 52.3, 44.4, 64.1, 68.2, 38.2, 67.4])
    ret = {
      :labels => labels,
      :assets => assets,
      :chartData => chartData
    }
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
end
