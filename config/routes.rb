Rails.application.routes.draw do

  namespace :api do
    scope :v1 do
      mount_devise_token_auth_for "User", at: 'auth'
    end
  end

  root 'application#app'
  get '/*path' => 'application#app'
end
