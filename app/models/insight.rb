class Insight < ActiveRecord::Base
  include Notable

  acts_as_taggable_on :tags

  validates :attachment, presence: true

  def tags=(tags)
    self.tag_list = tags
  end

  def as_json(options={})
    super.merge({
      tags: tags
    })
  end
end
