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
      url: "/api/v1/dashboards/#{cid}"
      success: (data) =>
        @current = Immutable.fromJS(data)
      error: (data) ->
        console.log(data)

  update: (args) ->
    p = $.Deferred()
    $.ajax
      url: "/api/v1/dashboards/#{args.id}"
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
