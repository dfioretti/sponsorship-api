class Api::V1::Apt::DataController < ApplicationController
  def index
    if params.has_key?(:metrics)
      @data = Metric.all.limit(500)
      render json: @data
    elsif params.has_key?(:scores)
      keys = Datum.where('score_id IS NOT NULL').select('point').pluck('point')
      @data = Metric.where('metric IN (?) AND entity_key != ?', keys, 'chicago_wolves')
      render json: @data
    else
      @data = Datum.where(:active => true)
      render json: @data
    end
  end
end
