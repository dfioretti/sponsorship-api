class ChangeAssetTypeToScope < ActiveRecord::Migration
  def change
    rename_column :assets, :type, :scope
  end
end
