class AddPermissionLevelToUsers < ActiveRecord::Migration
  def change
    add_column :users, :permission_level, :integer, default: 0
  end
end
