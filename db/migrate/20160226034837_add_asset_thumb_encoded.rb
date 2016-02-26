class AddAssetThumbEncoded < ActiveRecord::Migration
  def change
    add_column :assets, :thumb, :text
  end
end
