class Api::V1::Apt::DataController < ApplicationController
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
