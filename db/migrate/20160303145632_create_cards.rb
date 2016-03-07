class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title
      t.json :model
      t.json :state

      t.timestamps null: false
    end
  end
end
