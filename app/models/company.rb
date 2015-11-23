class Company < ActiveRecord::Base
  has_many :users, through: :dashboard
  has_many :notes
end
