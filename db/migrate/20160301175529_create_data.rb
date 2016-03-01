class CreateData < ActiveRecord::Migration
  def change
    create_table :data do |t|
      t.integer :asset_id
      t.string :source
      t.string :point
      t.decimal :value
      t.date :date

      t.timestamps null: false
    end
  end
end
