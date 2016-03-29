class AddScoreIdToDatum < ActiveRecord::Migration
  def change
    add_column :data, :score_id, :integer
  end
end
