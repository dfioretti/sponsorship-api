class AssetSetsStore extends EventEmitter
  constructor: ->
    return;
    @ready = false
    @current = Immutable.fromJS({})
    @asset_sets = Immutable.fromJS([])
    @list().then (asset_sets) =>
      @asset_sets = Immutable.fromJS(asset_sets)
      @ready = true
      @emit = "update"

  getState: (sid) ->
    {asset_sets: @asset_sets.toJS(), ready: @ready, current: @current.toJS()}

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
      url: "/api/v1/apt/asset_sets/#{sid}"
      success: (data) =>
        @current = Immutable.fromJS(data)
      error: (data) ->
        console.log(data)



  findBy: (field, sid) ->
    s = @asset_sets.find (asset_set) ->
      asset_set.get(field).toString() == sid.toString()

    if typeof(s) != 'undefined'
      s.toJS();

  find: (sid) ->
    s = @asset_sets.find (asset_set) ->
      asset_set.get("id").toString() == sid.toString()

    if typeof(s) != 'undefined'
      s.toJS();

  list: ->
    p = $.Deferred()

    $.ajax
      type: "GET"
      url: "/api/v1/apt/asset_sets/"
      contentType: "application/json"
      success: (data) =>
        console.log(data)
        p.resolve data.asset_sets
      error: (data) ->
        console.log(data)
    p

  update: (args, successCallback) ->
    p = $.Deferred()
    $.ajax
      url: "/api/v1/apt/asset_sets/#{args.id}"
      type: "PUT"
      data: JSON.stringify({asset_set: args})
      contentType: "application/json"
      succes: (data) =>
        console.log("success")
        @current = Immutable.fromJS(data)
        p.resolve data
        successCallback(data)
      error: (data) ->
        console.log(data)
    p

window.AssetSetsStore = new AssetSetsStore()
