class AddFieldsToAssets < ActiveRecord::Migration
  def change
    add_column :assets, :facebook_page, :string
    add_column :assets, :fanpage_link, :string
    add_column :assets, :twitter_handle, :string
    add_column :assets, :facebook_fans, :integer
    add_column :assets, :facebook_conversation, :integer
    add_column :assets, :twitter_followers, :integer
    add_column :assets, :klout_score, :float
    add_column :assets, :total_stats, :integer
  end
end
