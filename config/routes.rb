Rails.application.routes.draw do

  mount_devise_token_auth_for "User", at: 'api/v1/auth'

  namespace :api do
    namespace :v1 do
      resources :dashboards, only: [:show, :update]
      resources :notes, only: [:index, :create]
      resources :companies, only: [:index]
      get '/sign_upload' => 's3#sign_upload'
    end
  end

  root 'application#app'
  get '/*path' => 'application#app'
end
