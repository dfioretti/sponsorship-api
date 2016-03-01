class Datum < ActiveRecord::Base




  def self.make_up_data
    Asset.all.each do |a|
      val = a.facebook_fans
      twit = a.twitter_followers
      k = a.klout_score

      d = 1
      while d < 400 do
        date = d.day.ago
        low = 0.005 * val
        high = 0.08 * val
        val = val - (rand(low..high))
        Datum.new(:asset_id => a.id,
                  :kind => "social",
                  :source => "facebook",
                  :point => "facebook_fans",
                  :value => val.round,
                  :date => date).save

        low = 0.005 * twit
        hight = 0.08 * twit
        twit = val - (rand(low..high))
        Datum.new(:asset_id => a.id,
                  :kind => "social",
                  :source => "twitter",
                  :point => "twitter_followers",
                  :value => twit.round,
                  :date => date).save
        d += 1
      end
    end
  end







end
