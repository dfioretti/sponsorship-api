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
    company = Company.find_by_name('FIFA')
    user.dashboards.create(
      kind: "fifa",
      state: Dashboard::FIFA_DEFAULT_STATE,
      company_id: company.id
    )
  end

  def dashboard_params
    params.require(:dashboard).permit(:company_id).tap do |whitelisted|
      whitelisted[:state] = params[:dashboard][:state]
    end
  end
end
