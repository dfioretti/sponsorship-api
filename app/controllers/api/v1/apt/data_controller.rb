class Api::V1::Apt::DataController < ApplicationController
  def index
    @data = Datum.where(:active => true)
    render json: @data
  end
end
