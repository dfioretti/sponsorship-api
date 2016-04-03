class AddActiveToComponent < ActiveRecord::Migration
  def change
    add_column :custom_components, :active, :boolean, :default => true
  end
end
