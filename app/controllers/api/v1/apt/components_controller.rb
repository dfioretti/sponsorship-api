class Api::V1::Apt::ComponentsController < ApplicationController

  # get the definition of a componenet
  def show
    @component = CustomComponent.find(params[:id])
    render json: @component
  end


  def create
    @component = CustomComponent.new(component_params)
    if @component.save
      render json: @component
    else
      render json: {errors: @component.errors.full_messages}, status: :bad_request
    end
  end

  def update
    @component = CustomComponent.find(params[:id])
    if @component.update_attributes(component_params)
      render json: @component
    else
      render json: {errors: @component.errors.full_messages}, status: :bad_request
    end
  end

  # non-RESTful query for component render data
  def data
    @component = CustomComponent.find(params[:id])
    @data = nil;
    Rails.logger.debug("XXX")
    if (params[:type] == 'lineChart')
      if @component.dashboard_id < 0
        @data = @component.buildSingleAssetTrend
      else
        @data = @component.buildLineChartData
      end
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


  private
  def component_params
    params.require(:component).permit(:name, :view).tap do |whitelisted|
      whitelisted[:model] = params[:component][:model]
    end
  end
end
