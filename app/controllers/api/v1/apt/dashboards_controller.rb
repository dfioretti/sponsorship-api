class Api::V1::Apt::DashboardsController < ApplicationController

  def create
    @dashboard = Dashboard.new(dashboard_params)
    if @dashboard.save
      render json: @dashboard
    else
      render json: {errors: @dashboard.errors.full_messages}, status: :bad_request
    end
  end

  def index
    @dashboards = Dashboard.all
    render json: @dashboards
  end


  private
  def dashboard_params
    params.require(:dashboard).permit(:company_id, :kind, :item_id, :name).tap do |whitelisted|
      whitelisted[:state] = params[:dashboard][:state]
    end
  end
end
