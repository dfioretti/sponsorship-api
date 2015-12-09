class Api::V1::TeneoApiController < ApplicationController
  def post

  end

  def get
    request = Typhoeus::Request.new(
      params['path'],
      method: :get,
      headers: {
        'Accept' => 'json',
        'Authorization' => ENV['TENEO_API_KEY']
      },
      params: params.except(:path, :controller, :action, :teneo_api)
    )
    response = request.run
    render json: response.response_body
  rescue => e
    render json: e
  end
end
