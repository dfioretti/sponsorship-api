class Api::V1::Apt::ComponentsController < ApplicationController

  # get the definition of a componenet
  def show
    @component = CustomComponent.find(params[:id])
    render json: @component
  end

  # non-RESTful query for component render data
  def data
    @component = CustomComponent.find(params[:id])
    @data = nil;
    Rails.logger.debug("XXX")
    if (params[:type] == 'lineChart')
      @data = @component.buildLineChartData
    elsif (params[:type] == 'barChart')
    elsif (params[:type] == 'valueList')
      @data = @component.buildValueListData
    elsif (params[:type] == 'barList')

    elsif (params[:type] == 'doughnutChart')

    elsif (params[:type] == 'pieChart')
      @data = @component.buildPieChartData
    end
    render json: @data
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
