class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :dashboards
  has_many :notes

  validates_presence_of :name

  def permission_level_from_array(arr)
    arr.inject(0) do |sum, p|
      index = permissions_map.find_index(p)
      if index
        sum += (2 ** index)
      end
    end
  end

  def has_permission(type)
    permissions.find_index(type).present?
  end

  def permissions
    bin = "%b" % permission_level
    arr = bin.reverse.split('')
    p = []
    arr.each_with_index do |b, i|
      if b.to_i == 1
        p << permissions_map[i]
      end
    end
    p
  end


  def as_json(options = nil)
    super.merge({
      permissions: permissions
    })
  end

  private

  def permissions_map
    ['admin', 'fifa', 'ews']
  end
end
