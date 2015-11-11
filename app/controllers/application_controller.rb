class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Load entire react js app.

  def app
    @location_path = "/#{params[:path]}"
  end

  protected

  # (TODO) Needs API to check logged in and sessions.
  # Possibly should be storing sessions.

  def signed_in?
    true
  end
end
