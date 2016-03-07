class Datum < ActiveRecord::Base

  def self.make_up_data
    fb = [
      "facebook_fans",
      "facebook_conversation",
      "facebook_post_frequency"
    ]
    fb.each do |f|
      Datum.new(
        :source => "facebook",
        :point => f,
        :kind => "social",
        :icon => "/icons/facebook.png"
      ).save
    end
    twitter = [
      "twitter_followers",
      "twitter_post_frequency"
    ]
    twitter.each do |t|
      Datum.new(
        :source => "twitter",
        :point => t,
        :kind => "social",
        :icon => '/icons/twitter.png'
      ).save
    end
    instagram = [
      "instagram_followers",
      "instagram_post_frequency"
    ]
    instagram.each do |i|
      Datum.new(
        :source => "instagram",
        :point => i,
        :kind => "social",
        :icon => "/icons/instagram.png"
      ).save
    end
    scarborough = [
      "casual_fan_index",
      "casual_fan_count",
      "avid_fan_index",
      "avid_fan_count",
      "18_24_aa_m_casual_index",
      "18_24_aa_m_avid_index",
      "18_24_aa_m_casual_count",
      "18_24_aa_m_avid_count",
      "18_24_his_m_casual_index",
      "18_24_his_m_avid_index",
    ]
    scarborough.each do |s|
      Datum.new(
        :source => "scarborough",
        :point => s,
        :kind => "survey",
        :icon => "/icons/scarborough.png"
      ).save
    end
    score = [
      "passion_score",
      "performance_score"
    ]
    score.each do |s|
      Datum.new(
        :source => "native",
        :point => s,
        :kind => "derived",
        :icon => '/icons/native.png'
      ).save
    end
    contract = [
      "contract_price",
      "contract_term",
      "activation_spend",
      "activation_budget"
    ]
    contract.each do |c|
      Datum.new(
        :source => "contract",
        :point => c,
        :kind => "contract",
        :icon => "/icons/contract.png"
      ).save
    end
    klout = [
      "klout_score"
    ]
    klout.each do |k|
      Datum.new(
        :source => "klout",
        :point => k,
        :kind => "social",
        :icon => "/icons/klout.png"
      ).save
    end
  end







end
