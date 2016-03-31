class AddActiveToData < ActiveRecord::Migration
  def change
    add_column :data, :active, :boolean, :default => false
  end
end
