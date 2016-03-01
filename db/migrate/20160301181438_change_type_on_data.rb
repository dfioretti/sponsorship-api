class ChangeTypeOnData < ActiveRecord::Migration
  def change
    rename_column :data, :type, :kind
  end
end
