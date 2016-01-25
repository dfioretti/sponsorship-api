class Insight < ActiveRecord::Base
  include Notable

  validates :attachment, presence: true
end
