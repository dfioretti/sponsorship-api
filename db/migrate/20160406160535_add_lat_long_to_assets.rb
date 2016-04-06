class AddLatLongToAssets < ActiveRecord::Migration
  def change
    add_column :assets, :latitude, :decimal
    add_column :assets, :longitude, :decimal
  end
end
