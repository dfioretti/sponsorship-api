module Notable
  extend ActiveSupport::Concern

  included do
    belongs_to :user
    belongs_to :company

    validates :user_id, presence: true
    validates :company_id, presence: true

    scope :recent_by_company, ->(company_id) { where(company_id: company_id).order(created_at: :desc) }
  end

  def attachment_name
    attachment.blank? ? nil : attachment.split('/').last
  end


  def as_json(options= {})
    super.merge({
      attachment_name: attachment_name
    })
  end
end