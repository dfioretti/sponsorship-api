class AddItemIdToDashboard < ActiveRecord::Migration
  def change
    add_column :dashboards, :item_id, :integer
  end
end
