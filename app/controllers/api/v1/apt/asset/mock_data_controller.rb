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
      else 
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
      if (params[:id].to_i == 6)
        survey = [
          {"data_type_display_name" => "Casual Fan Index",
           "importance" => 0.85,
           "value" => 160},
          {"data_type_display_name" => "Avid Fan Index",
           "importance" => 0.78,
           "value" => 120},
          {"data_type_display_name" => "18-24 AA M Casual",
           "importance" => 0.40,
           "value" => 115},
          {"data_type_display_name" => "18-24 AA M Avid",
           "value" => 105,
           "importance" => 0.30},
          {"data_type_display_name" => "18-24 HIS M Casual",
           "importance" => 0.47,
           "value" => 122},
          {"data_type_display_name" => "18-24 HIS M Avid",
           "importance" => 0.38,
           "value" => 109}
        ]
      else
        survey = [
          {"data_type_display_name" => "Casual Fan Index",
           "importance" => 0.95,
           "value" => 180},
          {"data_type_display_name" => "Avid Fan Index",
           "importance" => 0.58,
           "value" => 110},
          {"data_type_display_name" => "18-24 AA M Casual",
           "importance" => 0.60,
           "value" => 135},
          {"data_type_display_name" => "18-24 AA M Avid",
           "value" => 115,
           "importance" => 0.40},
          {"data_type_display_name" => "18-24 HIS M Casual",
           "importance" => 0.37,
           "value" => 112},
          {"data_type_display_name" => "18-24 HIS M Avid",
           "importance" => 0.28,
           "value" => 89}
        ]
      end
      data['survey'] = survey
    end
    render json: data
  end
end
