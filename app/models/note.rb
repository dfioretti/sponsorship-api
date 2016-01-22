class Note < ActiveRecord::Base
  include Notable

  validates :body, presence: true
end
