class AssetSet < ActiveRecord::Base
  has_many :asset_set_items
  accepts_nested_attributes_for :asset_set_items, allow_destroy: true# :allow_destroy => true
end
