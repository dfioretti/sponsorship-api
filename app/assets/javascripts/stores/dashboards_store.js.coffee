class DashboardsStore extends EventEmitter
  constructor: ->
    @ready = false
    @current = Immutable.fromJS({})

  getState: (cid) ->
    {ready: @ready, current: @current.toJS()}

  getCurrent: (cid) ->
    $.ajax
      type: "GET"
      contentType: "application/json"
      url: "/api/v1/ews/dashboards/#{cid}"
      success: (data) =>
        @current = Immutable.fromJS(data)
      error: (data) ->
        console.log(data)

  update: (args) ->
    p = $.Deferred()
    $.ajax
      url: "/api/v1/ews/dashboards/#{args.id}"
      type: "PUT"
      data: JSON.stringify({dashboard: {state: args.state}})
      contentType: "application/json"
      success: (data) =>
        @current = Immutable.fromJS(data)
        p.resolve data
      error: (data) ->
        console.log(data)

    p

  getAsset: (aid) ->
    $.ajax
      type: "GET"
      contentType: "application/json"
      url: "/api/v1/apt/asset/dashboards/#{aid}"
      success: (data) =>
        @current = Immutable.fromJS(data)
      error: (data) ->
        console.log(data)

  updateAsset: (args) ->
    p = $.Deferred()
    $.ajax
      type: "PUT"
      url: "/api/v1/apt/asset/dashboards/#{args.id}"
      data: JSON.stringify({dashboard: {state: args.state}})
      contentType: "application/json"
      success: (data) =>
        @current = Immutable.fromJS(data)
        p.resolve data
      error: (data) ->
        console.log(data)
    p


  getFifa: () ->
    $.ajax
      type: "GET"
      contentType: "application/json"
      url: "/api/v1/fifa/dashboards/fifa"
      success: (data) =>
        @current = Immutable.fromJS(data)
      error: (data) ->
        console.log(data)

  updateFifa: (args) ->
    p = $.Deferred()
    $.ajax
      url: "/api/v1/fifa/dashboards/fifa"
      type: "PUT"
      data: JSON.stringify({dashboard: {state: args.state}})
      contentType: "application/json"
      success: (data) =>
        @current = Immutable.fromJS(data)
        p.resolve data
      error: (data) ->
        console.log(data)

    p


window.DashboardsStore = new DashboardsStore()
