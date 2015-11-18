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
    @companies.find (company) ->
      company.get("id").toString() == cid

  list: ->
    p = $.Deferred()

    # $.getJSON "", (data) =>
    #   p.resolve data.collaborators
    p.resolve MockCompanies

    p

window.CompaniesStore = new CompaniesStore()
