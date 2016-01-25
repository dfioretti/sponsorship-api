class Company < ActiveRecord::Base
  has_many :users, through: :dashboard
  has_many :notes
  has_many :insights

  validates_uniqueness_of :api_id, :ticker
end
