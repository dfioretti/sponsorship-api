class AddOwnedToAssets < ActiveRecord::Migration
  def change
    add_column :assets, :owned, :boolean, default: false
  end
end
