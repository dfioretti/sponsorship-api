class CompaniesStore extends EventEmitter
  constructor: ->
    @ready = false
    @current = Immutable.fromJS({})
    @companies = Immutable.fromJS([])
    @list().then (companies) =>
      @companies = Immutable.fromJS(companies)
      @ready = true
      @emit "update"

  getState: (cid) ->
    {companies: @companies.toJS(), ready: @ready, current: @current.toJS()}

  setCurrent: (cid) ->
    if @ready
      if cid
        @current = Immutable.fromJS(@findBy('id', cid))
      else
        @current = Immutable.fromJS({})

  findBy: (field, cid) ->
    c = @companies.find (company) ->
      company.get(field).toString() == cid.toString()

    if typeof(c) != 'undefined'
      c.toJS();

  find: (cid) ->
    c = @companies.find (company) ->
      company.get("api_id").toString() == cid.toString()

    if typeof(c) != 'undefined'
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
