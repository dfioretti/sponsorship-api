class Api::V1::Apt::ScoresController < ApplicationController

  def index
    @scores = Score.all
    render json: @scores
  end

  def show
    score = Score.find(params[:id])
    render json: score
  end

  def create
    @score = Score.new(score_params)
    if @score.save
      Datum.new(
      :source => "native",
      :point => @score.name,
      :kind => "derived",
      :icon => "/images/icons/native.png",
      :score_id => @score.id
      ).save
      CalculateScoreJob.new(@score).enqueue()
      render json: @score
    else
      render json: {errors: @score.errors.full_messages}, status: :bad_request
    end
  end

  def new
  end


  def update
    @score  = Score.find(params[:id])
    if @score.update_attributes(score_params)
      CalculateScoreJob.new(@score).enqueue()
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
