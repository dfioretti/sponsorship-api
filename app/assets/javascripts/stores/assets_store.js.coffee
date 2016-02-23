class AssetsStore extends EventEmitter
  constructor: ->
    @ready = false
    @current = Immutable.fromJS({})
    @assets = Immutable.fromJS([])
    @list().then (assets) =>
      @assets = Immutable.fromJS(assets)
      @ready = true
      @emit = "update"

  getState: (aid) ->
    {assets: @assets.toJS(), ready: @ready, current: @current.toJS()}

  setCurrent: (aid) ->
    if @ready
      if aid
        @current = Immutable.fromJS(@findBy('id', aid))
      else
        @current = Immutable.fromJS({})

  findBy: (field, aid) ->
    a = @assets.find (asset) ->
      asset.get(field).toString() == aid.toString()

    if typeof(a) != 'undefined'
      a.toJS();

  find: (aid) ->
    a = @assets.find (asset) ->
      asset.get("id").toString() == aid.toString()

    if typeof(a) != 'undefined'
      a.toJS();

  list: ->
    p = $.Deferred()

    $.ajax
      type: "GET",
      contentType: "application/json"
      url: "/api/v1/assets"
      success: (data) =>
        p.resolve data.assets
      error: (data) ->
        console.log(data)

    p

window.AssetsStore = new AssetsStore()
