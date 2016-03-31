class AddActiveAndKeyToAssets < ActiveRecord::Migration
  def change
    add_column :assets, :active, :boolean, :default => true
    add_column :assets, :entity_key, :string
  end
end
