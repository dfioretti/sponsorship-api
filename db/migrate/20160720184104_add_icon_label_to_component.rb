class AddIconLabelToComponent < ActiveRecord::Migration
  def change
    add_column :custom_components, :icon, :string, :default => 'metric'
    add_column :custom_components, :label, :string, :default => 'metric'
  end
end
