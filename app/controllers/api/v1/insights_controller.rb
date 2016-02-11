class Api::V1::InsightsController < ApplicationController
  def index
    insights = Insight.includes(:user).recent_by_company(params[:company_id])
    render json: insights.to_json(include: :user)
  end

  def create
    insight = current_user.insights.build insight_params

    if insight.save
      render json: insight.to_json(include: :user)
    else
      render json: {errors: insight.errors.full_messages}, status: :bad_request
    end
  end

  private

  def insight_params
    params.require(:insight).permit(:body, :attachment, :company_id, :tag_list)
  end
end
