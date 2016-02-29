class CreateAssetSetItems < ActiveRecord::Migration
  def change
    create_table :asset_set_items do |t|
      t.integer :asset_set_id
      t.integer :asset_id

      t.timestamps null: false
    end
  end
end
