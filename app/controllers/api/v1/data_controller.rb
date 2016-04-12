class Api::V1::DataController < ApplicationController
  before_action :authenticate_user!

  def index
    if params.has_key?(:metrics)
      @data = Metric.all.limit(500)
      render json: @data
    else
      @data = Datum.where(:active => true)
      render json: @data
    end
  end
end
