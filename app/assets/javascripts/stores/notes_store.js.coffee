class NotesStore extends EventEmitter
  constructor: ->
    @ready = false
    @notes = Immutable.fromJS([])

  getState: (cid) ->
    {notes: @notes.toJS(), ready: @ready}

  setCompanyId: (cid) ->
    if @companyId != cid
      @companyId = cid
      @ready = false
      @notes = Immutable.fromJS([])
      @emit "update"
      @list().then (notes) =>
        @ready = true
        @notes = Immutable.fromJS(notes)
        @emit "update"

  list: () ->
    p = $.Deferred()
    $.ajax
      url: "/api/v1/notes/"
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
      url: "/api/v1/notes"
      type: "POST"
      data: JSON.stringify({note: args})
      contentType: "application/json"
      success: (data) =>
        @notes = @notes.unshift Immutable.fromJS(data)
        p.resolve data
      error: (data) ->
        console.log(data)

    p

window.NotesStore = new NotesStore()
