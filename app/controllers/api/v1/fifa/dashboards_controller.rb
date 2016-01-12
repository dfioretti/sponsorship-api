class Api::V1::Fifa::DashboardsController < ApplicationController

  def show
    dashboard = current_user.dashboards.find_by_kind 'fifa'
    dashboard = create_dashboard(current_user) if dashboard.nil?
    render json: dashboard
  end

  def update
    dashboard = current_user.dashboards.find_by_kind 'fifa'
    if dashboard.update dashboard_params
      render json: dashboard
    else
      render json: {errors: dashboard.errors.full_messages}, status: :bad_request
    end
  end

  private

  def create_dashboard(user)
    user.dashboards.create(
      kind: "fifa",
      state: {
        rep_score: {index: 0, toggle: "on"},
        insights_implications: {index: 1, toggle: "on"},
        global_hotspots: {index: 2, toggle: "on"},
        global_influencers: {index: 3, toggle: "on"},
        news: {index: 4, toggle: "on"},
        global_issues: {index: 5, toggle: "on"}
      }
    )
  end

  def dashboard_params
    params.require(:dashboard).permit(:company_id).tap do |whitelisted|
      whitelisted[:state] = params[:dashboard][:state]
    end
  end
end
