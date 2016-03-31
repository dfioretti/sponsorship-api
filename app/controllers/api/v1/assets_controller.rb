class Api::V1::AssetsController < ApplicationController
  def index
    @assets = Asset.where(:active => true).order("name ASC")
    render json: @assets, :include => :metrics
  end
end
