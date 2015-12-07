class Company < ActiveRecord::Base
  has_many :users, through: :dashboard
  has_many :notes

  validates_uniqueness_of :api_id, :ticker
end
