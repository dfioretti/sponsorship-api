class Api::V1::DashboardsController < ApplicationController
  before_action :authenticate_user!

  def create
    @dashboard = Dashboard.new(dashboard_params)
    if @dashboard.save
      render json: @dashboard
    else
      render json: {errors: @dashboard.errors.full_messages}, status: :bad_request
    end
  end

  def index
    if params.has_key?(:kind)
      @dashboard = Dashboard.where(:kind => params[:kind]).first
      render json: @dashboard, :include => :metrics
    else
      @dashboards = Dashboard.all
      render json: @dashboards
    end
  end

  def update
    @dashboard = Dashboard.find(params[:id])
    if @dashboard.update_attributes(dashboard_params)
      render json: @dashboard
    else
      render json: {errors: @dashboard.errors.full_messages}, status: :bad_request
    end
  end

  private
  def dashboard_params
    params.require(:dashboard).permit(:id, :state, :company_id, :kind, :item_id, :name).tap do |whitelisted|
      whitelisted[:state] = params[:dashboard][:state]
    end
  end
end
