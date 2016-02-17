class AddScoreToAsset < ActiveRecord::Migration
  def change
    add_column :assets, :score, :float
  end
end
