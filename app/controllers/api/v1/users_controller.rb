class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: { user: current_user }
  end

  def index
    if current_user.has_permission( 'admin' )
      render json: { users: User.all }
    else
      render json: { errors: "Unauthorized" }, status: 401
    end
  end

  def update
    user = User.find( params[:id] )
    level = user.permission_level_from_array( user_params[:permissions] )

    if user.update( permission_level: level )
      render json: { user: user }
    else
      render json: { errors: users.error.full_messages }, status: 422
    end

  end

  private

  def user_params
    params.require( :user ).permit( :email, :name, :permission_level ).tap do |whitelisted|
      whitelisted[:permissions] = params[:user][:permissions]
    end
  end
end
