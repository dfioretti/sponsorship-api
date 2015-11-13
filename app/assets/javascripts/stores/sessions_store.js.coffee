class SessionsStore
  constructor: ->
    # @session = sessionStorage.getItem 'accessToken'
    # @email = sessionStorage.getItem 'email'
    @test = "TEST"

  LoggedIn: ->
    console.log("CHECK LOGGED IN");
    console.log(this.test);


window.SessionsStore = new SessionsStore()
