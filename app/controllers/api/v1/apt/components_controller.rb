class Api::V1::Apt::ComponentsController < ApplicationController

  # get the definition of a componenet
  def show
    componenet = CustomComponent.find(params[:id])
    render json: component
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
