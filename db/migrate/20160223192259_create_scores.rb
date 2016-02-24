class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string :name
      t.json :score
      t.text :image
      t.integer :asset_set
      t.string :asset_set_name
      t.integer :company_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
