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
    end
    render json: data
  end
end
