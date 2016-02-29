class CreateAssetSet < ActiveRecord::Migration
  def change
    create_table :asset_sets do |t|
      t.string :name
      t.integer :user_id
      t.integer :portfolio

      t.timestamps null: false
    end
  end
end
