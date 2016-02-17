class Api::V1::Apt::Asset::DashboardsController < ApplicationController

  def show
    dashboard = current_user.dashboards.find_by_kind_and_company 'asset', 9999
    render json: dashboard
  end

  def update
    dashboard = current_user.dashboards.find_by_kind_and_company 'asset', 9999
    if dashboard.update dashboard_params
      render json: dashboard
    else
      render json: {errors: dashboard.errors.full_messages}, status: :bad_request
    end
  end

end
