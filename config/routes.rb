Rails.application.routes.draw do
  root 'application#app'
  get '/*path' => 'application#app'
end
