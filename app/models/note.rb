class Note < ActiveRecord::Base
  belongs_to :user
  belongs_to :company

  validates_presence_of :user_id, :company_id, :body
end
