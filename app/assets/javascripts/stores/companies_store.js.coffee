class CompaniesStore extends EventEmitter
  constructor: ->
    @ready = false
    @current = Immutable.fromJS({})
    @list().then (companies) =>
      @ready = true
      @companies = Immutable.fromJS(companies)
      @emit "update"

  getState: (cid) ->
    {companies: @companies.toJS(), ready: @ready, current: @current.toJS()}

  setCurrent: (cid) ->
    if cid
      @current = Immutable.fromJS(@find(cid))
    else
      @current = Immutable.fromJS({})

  find: (cid) ->
    c = @companies.find (company) ->
      company.get("id").toString() == cid.toString()

    c.toJS();

  list: ->
    p = $.Deferred()

    $.ajax
      type: "GET"
      contentType: "application/json"
      url: "/api/v1/companies"
      success: (data) =>
        p.resolve data.companies
      error: (data) ->
        console.log(data)

    p

window.CompaniesStore = new CompaniesStore()
