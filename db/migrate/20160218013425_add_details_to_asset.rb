class AddDetailsToAsset < ActiveRecord::Migration
  def change
    add_column :assets, :pretty_cost, :string
    add_column :assets, :pretty_renewal, :string
    add_column :assets, :pretty_term, :string
  end
end
