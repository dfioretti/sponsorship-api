class Api::V1::AssetsController < ApplicationController
  def index
    render json: {assets: Asset.all.order(name: :asc)}
  end
end
