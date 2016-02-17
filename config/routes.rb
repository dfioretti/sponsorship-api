Rails.application.routes.draw do

  mount_devise_token_auth_for "User", at: 'api/v1/auth'

  namespace :api do
    namespace :v1 do
      namespace :ews do
        resources :dashboards, only: [:show, :update]
        get '/teneo_api' => 'teneo_api#get'
      end

      namespace :fifa do
        resources :dashboards, only: [:show, :update]
        get '/teneo_api' => 'teneo_api#get'
      end

      namespace :apt do
        namespace :asset do
          resources :dashboards, only: [:show, :update]
        end
      end

      resources :assets, only: [:index]
      resources :notes, only: [:index, :create]
      resources :insights, only: [:index, :create]
      resources :companies, only: [:index]
      resources :users, only: [:index, :update]
      get '/sign_upload' => 's3#sign_upload'
    end
  end

  root 'application#app'
  get '/*path' => 'application#app'
end
