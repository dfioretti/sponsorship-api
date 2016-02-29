class AssetSet < ActiveRecord::Base
  has_many :asset_set_items
  
end
