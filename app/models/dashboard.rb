class Dashboard < ActiveRecord::Base
  has_many :metrics, :primary_key => 'kind', :foreign_key => 'entity_key'
  belongs_to :user
  belongs_to :company

  FIFA_DEFAULT_STATE = {
    teneo_rep_score: {index: 0, toggle: "on"},
    top_global_issues: {index: 1, toggle: "on"},
    global_hotspots: {index: 2, toggle: "on"},
    top_global_influencers: {index: 3, toggle: "on"},
    top_news: {index: 4, toggle: "on"},
    insights_implications: {index: 5, toggle: "on"}
  }
end
