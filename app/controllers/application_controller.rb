class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  before_action :configure_permitted_parameters, if: :devise_controller?

  # Load entire react js app.

  def app
    render json: {app_load: true}
    #@location_path = "/#{params[:path]}"
  end

  def index
    render json: {index_load: true}
#    render :file => 'client/index.html'
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up).push(:name)
    devise_parameter_sanitizer.for(:account_update).push(:name, :image)
  end

  #def user_not_authorized
  #  render json: { error: 'Unauthorized' }, status: :unauthorized
  #end

end
