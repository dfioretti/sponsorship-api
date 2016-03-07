class ScoresStore extends EventEmitter
  constructor: ->
    @ready = false
    @current = Immutable.fromJS({})
    @scores = Immutable.fromJS([])
    @list().then (scores) =>
      @scores = Immutable.fromJS(scores)
      @ready = true
      @emit = "update"

  getState: (sid) ->
    {scores: @scores.toJS(), ready: @ready, current: @current.toJS()}

  setCurrent: (sid) ->
    if @ready
      if sid
        @current = Immutable.fromJS(@findBy('id', sid))
      else
        @current = Immutable.fromJS({})

  getCurrent: (sid) ->
    $.ajax
      type: "GET"
      contentType: "application/json"
      url: "/api/v1/apt/scores/#{sid}"
      success: (data) =>
        @current = Immutable.fromJS(data)
      error: (data) ->
        console.log(data)



  findBy: (field, sid) ->
    s = @scores.find (score) ->
      score.get(field).toString() == sid.toString()

    if typeof(s) != 'undefined'
      s.toJS();

  find: (sid) ->
    s = @scores.find (score) ->
      score.get("id").toString() == sid.toString()

    if typeof(s) != 'undefined'
      s.toJS();

  list: ->
    p = $.Deferred()

    $.ajax
      type: "GET"
      url: "/api/v1/apt/scores/"
      contentType: "application/json"
      success: (data) =>
        p.resolve data.scores
      error: (data) ->
        console.log(data)
    p

  update: (args, successCallback) ->
    p = $.Deferred()
    $.ajax
      url: "/api/v1/apt/scores/#{args.id}"
      type: "PUT"
      data: JSON.stringify({score: args})
      contentType: "application/json"
      succes: (data) =>
        console.log("success")
        @current = Immutable.fromJS(data)
        setAlert("Score model saved!", "notice")
        p.resolve data
        successCallback(data)
      error: (data) ->
        setAlert("Score model save failed!", "error")
        console.log(data)
    p

window.ScoresStore = new ScoresStore()
