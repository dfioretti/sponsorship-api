Rails.application.routes.draw do

  mount_devise_token_auth_for "User", at: 'api/v1/auth'

  namespace :api, :defaults => { :format => :json } do
    namespace :v1 do
      resources :twitter, only: [:index]
      resources :mock_data, only: [:index]
      get '/components/data/:id' => 'components#data'
      resources :dashboards, only: [:create, :show, :update, :index]
      resources :data, only: [:index]
      resources :cards, only: [:index, :new, :show, :update]
      resources :components, only: [:show, :new, :update, :index, :create]
      resources :scores, only: [:index, :new, :show, :update, :create]
      resources :assets, only: [:index, :show]
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
