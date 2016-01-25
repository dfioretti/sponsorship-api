class CreateInsights < ActiveRecord::Migration
  def change
    create_table :insights do |t|
      t.integer :user_id
      t.integer :company_id
      t.text :body
      t.text :attachment

      t.timestamps null: false
    end
  end
end
