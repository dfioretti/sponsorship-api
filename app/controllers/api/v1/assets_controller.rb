class Api::V1::AssetsController < ApplicationController
  def index
    @assets = Asset.all
    render json: @assets
  end
end
