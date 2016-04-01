class AddNormalizedValueToMetrics < ActiveRecord::Migration
  def change
    add_column :metrics, :norm_value, :decimal
  end
end
