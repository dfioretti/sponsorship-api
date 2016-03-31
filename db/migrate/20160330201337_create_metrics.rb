class CreateMetrics < ActiveRecord::Migration
  def change
    create_table :metrics do |t|
      t.string :entity_id
      t.string :entity_type
      t.string :source
      t.string :metric
      t.decimal :value
      t.string :icon

      t.timestamps null: false
    end
  end
end
