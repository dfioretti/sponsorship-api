class AddIconToDatum < ActiveRecord::Migration
  def change
    add_column :data, :icon, :string
  end
end
