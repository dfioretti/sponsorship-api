class Api::V1::TwitterController < ApplicationController
  before_action :authenticate_user!

  def index
    client = Twitter::REST::Client.new do |config|
      config.consumer_key 		 = 'DrO4fiDyRr9TOQTfqopihCP97'
      config.consumer_secret 	 = 'y0PsQgVPSl8ynaFx3JijYqpINlcALjsWWYkjzoXeY5z5TqArBr'
      config.access_token 		 = '2804869345-eWiEAhZczASVW05Zi4rTEi62BVUU2ApzLCRoRRr'
      config.access_token_secret = '0hgQ0mWzHXsbCZu5NMxZqRZtgdkyyqln9MtN96FlEwmcX'
    end
    timeline = client.user_timeline(params[:screen_name])
    render json: timeline
  end
end
