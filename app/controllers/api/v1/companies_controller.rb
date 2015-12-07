class Api::V1::CompaniesController < ApplicationController
  def index
    render json: {companies: Company.all.order(name: :asc)}
  end
end
