class CreateDashboards < ActiveRecord::Migration
  def change
    create_table :dashboards do |t|
      t.integer :company_id
      t.integer :user_id
      t.json :state, default: {}

      t.timestamps null: false
    end
  end
end
