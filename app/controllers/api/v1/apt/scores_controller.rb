class Api::V1::Apt::ScoresController < ApplicationController

  def index
    render json: {scores: Score.all.order(name: :asc)}
  end

  def show
    score = Score.find(params[:id])
    Rails.logger.debug(score);
    # hang on for this
    #score = create_score(params[:id], current_user) if score.nil?

    render json: score
  end

  def new
    @score = Score.new(:user_id => current_user.id,
                       :company_id => 999,
                       :asset_set => 1)
    if @score.save
      render json: @score
    else
      render json: {errors: @score.errors.full_messages}, status: :bad_request
    end

  end


  def update
    @score  = Score.find(params[:id])
    if @score.update_attributes(score_params)
      render json: @score
    else
      render json: {errors: @score.errors.full_messages}, status: :bad_request
    end
  end

  private
  def score_params
    params.require(:score).permit(:name, :score, :image, :asset_set,
                                  :asset_set_name, :company, :user_id)
  end

  def create_score(score_id, user)
    Score.new(:id => score_id,
              :user_id => user.id
    ).save
  end

end
