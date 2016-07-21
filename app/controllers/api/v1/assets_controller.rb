class Api::V1::AssetsController < ApplicationController
  def index
    @assets = Asset.where(:active => true).order("name ASC")
    render json: @assets, :include => [ :metrics, :historicals ]
  end

  def show
    @asset = Asset.find(params[:id])
    render json: @asset, :include => [ :metrics, :historicals ]
  end
end
