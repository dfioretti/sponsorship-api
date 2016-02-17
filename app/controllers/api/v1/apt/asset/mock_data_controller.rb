class Api::V1::Apt::Asset::MockDataController < ApplicationController
  def show
    data = Hash.new
    social = {
      "twitter" => 234323,
      "facebook" => 18391,
      "instagram" => 583818,
      "klout" => 83,
      "google" => 1281
    }
    data['social'] = social
    render json: data
  end
end
