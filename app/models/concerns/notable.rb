module Notable
  extend ActiveSupport::Concern

  included do
    belongs_to :user
    belongs_to :company

    validates :user_id, presence: true
    validates :company_id, presence: true
  end

  def attachment_name
    attachment.blank? ? nil : attachment.split('/').last
  end
end