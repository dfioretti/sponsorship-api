class Api::V1::Apt::ComponentsController < ApplicationController

  # get the definition of a componenet
  def show
    @component = CustomComponent.find(params[:id])
    render json: @component
  end

  # non-RESTful query for component render data
  def data
    Rails.logger.debug("XXX")
    render json: {:success => true}
  end


  # cheating for now, should create something else
  def index
  end

  # create a new component
  def new
  end


  # update a component
  def update
  end

end
