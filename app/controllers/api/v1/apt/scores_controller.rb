class Api::V1::Apt::ScoresController < ApplicationController

  def index
    @scores = Score.all
    render json: @scores, :include => [ :data ]
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
      :point => @score.name.split(' ').join('_').downcase,
      :kind => "derived",
      :icon => "/images/icons/native.png",
      :score_id => @score.id,
      :active => true
      ).save
      ScoreWorker.perform_async(@score.id)
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
      ScoreWorker.perform_async(@score.id)
      Datum.where('score_id = ? AND kind != ?', @score.id, 'derived').update_all(score_id: nil)
      @score.score['nodeDataArray'].each do |node|
        if node['mode'] == 'value'
          Datum.where('point = ?', node['dataname']).update_all(score_id: @score.id)
        end
      end
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
