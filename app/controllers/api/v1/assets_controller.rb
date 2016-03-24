class Api::V1::AssetsController < ApplicationController
  def index
    @assets = Asset.order("name ASC").all
    render json: @assets
  end
end
