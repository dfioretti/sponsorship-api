class CreateAssets < ActiveRecord::Migration
  def change
    create_table :assets do |t|
      t.string :name
      t.string :type
      t.string :category
      t.string :subcategory
      t.text :description
      t.decimal :cost
      t.date :renewal

      t.timestamps null: false
    end
  end
end
