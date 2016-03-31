class ChangeMetrickEntityIdToKey < ActiveRecord::Migration
  def change
    rename_column :metrics, :entity_id, :entity_key
  end
end
