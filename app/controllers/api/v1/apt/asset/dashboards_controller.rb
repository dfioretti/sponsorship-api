class Api::V1::Apt::Asset::DashboardsController < ApplicationController

  def show
    #dashboard = current_user.dashboards.find_by_item_id params[:id]
    dashboard = current_user.dashboards.find_by_kind 'asset'
    dashboard = create_dashboard(params[:id], current_user) if dashboard.nil?

    render json: dashboard
  end

  def update
    dashboard = current_user.dashboards.find params[:id]
    if dashboard.update dashboard_params
      render json: dashboard
    else
      render json: {errors: dashboard.errors.full_messages}, status: :bad_request
    end
  end

  private

  def create_dashboard(item_id, user)
    user.dashboards.create(
      item_id: item_id,
      state: {
        asset_overview: {index: 0, toggle: "on"},
        social_stats: {index: 1, toggle: "on"},
        consumer_survey: {index: 2, toggle: "on"},
        notes: {index: 3, toggle: "on"}
      }
    )
  end

  def self.reset_dashboard(did)

  end

  def dashboard_params
    params.require(:dashboard).permit(:item_id).tap do |whitelisted|
      whitelisted[:state] = params[:dashboard][:state]
    end
  end

end
