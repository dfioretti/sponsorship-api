class Api::V1::Apt::DataController < ApplicationController
  def index
    @data = Datum.all
    render json: @data
  end
end
