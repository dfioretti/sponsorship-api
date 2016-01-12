class AddKindToDashboard < ActiveRecord::Migration
  def change
    add_column :dashboards, :kind, :string
  end
end
