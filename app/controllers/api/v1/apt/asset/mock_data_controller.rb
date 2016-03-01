class Api::V1::Apt::Asset::MockDataController < ApplicationController
  def index
    Rails.logger.debug("GO:WTF")
    Rails.logger.debug(params[:type])
    Rails.logger.debug(params[:id])

    data = Hash.new
    if (params[:type] == "social")
      if (params[:id].to_i == 6)
        social = {
          "twitter" => 234323,
          "facebook" => 18391,
          "instagram" => 583818,
          "klout" => 83,
          "google" => 1281
        }
        data['stats'] = social
      elsif (params[:id].to_i == 7)
        social = {
          "twitter" => 121818,
          "facebook" => 817218,
          "instagram" => 973817,
          "klout" => 81,
          "google" => 8234
        }
        data['stats'] = social
      end
    elsif (params[:type] == "survey")
      survey = [
        {"data_type_display_name" => "Casual Fan Index",
         "importance" => rand(0.2..0.9),
         "value" => rand(80..120)},
        {"data_type_display_name" => "Avid Fan Index",
         "importance" => rand(0.2..0.9),
         "value" => rand(80..120)},
        #{"data_type_display_name" => "18-24 AA M Casual",
        # "importance" => rand(0.2..0.9),
        # "value" => rand(80..120)},
        #{"data_type_display_name" => "18-24 AA M Avid",
        # "value" => rand(80..120),
        # "importance" => rand(0.2..0.9)},
        #{"data_type_display_name" => "18-24 HIS M Casual",
        # "importance" => rand(0.2..0.9),
        # "value" => rand(80..120)},
        #{"data_type_display_name" => "18-24 HIS M Avid",
        # "importance" => rand(0.2..0.9),
        # "value" => rand(80..120)}
       ]
      data['survey'] = survey
    end
    render json: data
  end
end
