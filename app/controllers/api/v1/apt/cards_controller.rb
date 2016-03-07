class Api::V1::Apt::CardsController < ApplicationController


  def show
    @card = Card.find(params[:id])
    render json: @card
  end

  def update
  end

  def index
    @cards = Card.all
    render json: @cards
  end

  def update
    @card = Card.find(params[:id])
    if @card.update_attributes(card_params)
      render json: @card
    else
      render json: {errors: @card.errors.full_messages}, status: :bad_request
    end
  end


  private
  def card_params
    params.require(:card).permit(:title, :model, :state)
  end

end
