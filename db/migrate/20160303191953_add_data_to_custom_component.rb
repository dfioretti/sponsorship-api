class AddDataToCustomComponent < ActiveRecord::Migration
  def change
    add_column :custom_components, :model, :json
    add_column :custom_components, :state, :json
  end
end
