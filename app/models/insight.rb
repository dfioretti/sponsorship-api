class Insight < ActiveRecord::Base
  include Notable

  acts_as_taggable_on :tags

  validates :attachment, presence: true

  def as_json(options={})
    super.merge({
      tags_list: tags
    })
  end
end
