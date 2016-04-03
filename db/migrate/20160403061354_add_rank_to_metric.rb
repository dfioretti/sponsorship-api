class AddRankToMetric < ActiveRecord::Migration
  def change
    add_column :metrics, :rank, :decimal
  end
end
