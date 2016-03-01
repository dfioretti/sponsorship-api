class CustomComponent < ActiveRecord::Base


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
