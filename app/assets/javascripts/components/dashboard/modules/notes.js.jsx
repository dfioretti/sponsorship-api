var Notes = React.createClass({
  componentWillReceiveProps: function(newProps) {
    console.log("NOTES WILL RECEIVE PROPS");
    console.log(NotesStore.getState());
  },
  clearForm: function() {
    ReactDOM.findDOMNode(this.refs.form).reset();
  },
  save: function(e) {
    e.preventDefault();
    var body = ReactDOM.findDOMNode(this.refs.body).value;
    var file = ReactDOM.findDOMNode(this.refs.file).files[0];

    var args = {body: body, file: file, company_id: this.props.company.id};
    NotesStore.create(args).then(function() {
      this.clearForm();
    }.bind(this));
  },
  renderNotesList: function() {
    var notes = $.map(NotesStore.getState().notes, function(note) {
      return (
        <TextListItem key={note.id} user={note.user} body={note.body} date={note.created_at} attachement={note.attachement} />
      );
    });
    return (
      <ul className="text-list notes-list">
        {notes}
      </ul>
    );
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="notes" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Notes</div>
          <div className="main">
            {this.renderNotesList()}
            <div className="new-note">
              <form ref="form" onSubmit={this.save}>
                <textarea placeholder="New note here..." ref="body"></textarea>
                <div className="attachment">
                  <input type="file" className="file-input" ref="file" />
                </div>
                <button type="submit" className="note-submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
