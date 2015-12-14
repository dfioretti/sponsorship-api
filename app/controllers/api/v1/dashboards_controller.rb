class Api::V1::DashboardsController < ApplicationController

  def show
    dashboard = current_user.dashboards.find_by_company_id params[:id]
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

  def create_dashboard(company_id, user)
    user.dashboards.create(
      company_id: company_id,
      state: {
        risk_assessment: {index: 0, toggle: "on"},
        risk_indicators: {index: 1, toggle: "on"},
        historical_precedent: {index: 2, toggle: "on"},
        general_financials: {index: 3, toggle: "on"},
        notes: {index: 4, toggle: "on"}
        # likely_attackers: {index: 3, toggle: "on"},
        # social_sentiment: {index: 5, toggle: "on"},
        # key_social_posts: {index: 6, toggle: "on"},
      }
    )
  end

  def dashboard_params
    params.require(:dashboard).permit(:company_id).tap do |whitelisted|
      whitelisted[:state] = params[:dashboard][:state]
    end
  end
end
