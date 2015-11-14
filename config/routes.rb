Rails.application.routes.draw do

  mount_devise_token_auth_for "User", at: 'api/v1/auth'
  get '/test' => 'test#test'

  root 'application#app'
  get '/*path' => 'application#app'
end
