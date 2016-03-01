class CreateCustomComponents < ActiveRecord::Migration
  def change
    create_table :custom_components do |t|
      t.string :name
      t.integer :dashboard_id
      t.string :view
      t.string :interval
      t.integer :asset_set_id
      t.json :data

      t.timestamps null: false
    end
  end
end
