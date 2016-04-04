class Api::V1::AssetsController < ApplicationController
  def index
    @assets = Asset.where(:active => true).order("name ASC")
    render json: @assets#, :include => :metrics
  end

  def show
    puts "WTF IS GOING ON"
    @asset = Asset.find(params[:id])
    render json: @asset, :include => :metrics
  end
end
