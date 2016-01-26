class Api::V1::Fifa::TeneoApiController < ApplicationController
  def get
    request = Typhoeus::Request.new(
      params['path'],
      method: :get,
      headers: {
        'Accept' => 'json',
        'Authorization' => ENV['FIFA_API_KEY']
      },
      params: params.except(:path, :controller, :action, :teneo_api)
    )
    response = request.run
    render json: git response.response_body
  rescue => e
    render json: e
  end
end
