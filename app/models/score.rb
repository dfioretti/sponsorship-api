class Score < ActiveRecord::Base

  def self.setup_scores
    Score.delete_all
    score = { :score => "myscore" }
    Score.new(:name => "Passion Score",
              :image => "imagestring",
              :score => score,
              :asset_set => 1,
              :asset_set_name => "Regional Sports",
              :user_id => 20,
              :company_id => 999
    ).save
  end
end
