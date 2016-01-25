class InsightsStore extends EventEmitter
  constructor: ->
    @ready = false
    @insights = Immutable.fromJS([])

  getState: (cid) ->
    {insights: @insights.toJS(), ready: @ready}

  poll: (cid) ->
    @companyId = cid
    @ready = false
    @list().then (insights) =>
      @ready = true
      @insights = Immutable.fromJS(insights)

  list: () ->
    p = $.Deferred()
    $.ajax
      url: "/api/v1/insights"
      type: "GET"
      data: {company_id: @companyId}
      contentType: "application/json"
      success: (data) =>
        p.resolve data
      error: (data) ->
        console.log(data)

    p

  create: (args) ->
    p = $.Deferred()

    $.ajax
      url: "/api/v1/insights"
      type: "POST"
      data: JSON.stringify({insight: args})
      contentType: "application/json"
      success: (data) =>
        @insights = @insights.unshift Immutable.fromJS(data)
        p.resolve data
      error: (data) ->
        console.log(data)

    p

window.InsightsStore = new InsightsStore()
