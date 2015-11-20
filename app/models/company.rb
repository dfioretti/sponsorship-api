class Company < ActiveRecord::Base
  has_many :users, through: :dashboard
end
