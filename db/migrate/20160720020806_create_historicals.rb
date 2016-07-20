class CreateHistoricals < ActiveRecord::Migration
  def change
    create_table :historicals do |t|
      t.json :data
      t.string :entity_key
      t.string :metric
      t.string :icon
      t.string :source

      t.timestamps null: false
    end
  end
end
