var Notes = React.createClass({
  getInitialState: function() {
    return {notes: NotesStore.getState().notes};
  },
  componentWillMount: function() {
    var s = this;
    (function poll(){
      setTimeout(function(){
        NotesStore.poll(s.props.company.id).then(function(notes){
          s.setState({notes: NotesStore.getState().notes});
          poll();
        });
      }, 10000);
    })();
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({notes: NotesStore.getState().notes});
  },
  clearForm: function() {
    ReactDOM.findDOMNode(this.refs.form).reset();
  },
  save: function(e) {
    e.preventDefault();

    var p = this;

    var body = ReactDOM.findDOMNode(p.refs.body).value;
    var file = ReactDOM.findDOMNode(this.refs.file).files[0];
    var args = {body: body, company_id: p.props.company.id};

    if (typeof(file) != 'undefined') {
      $('.note-submit').attr('disabled', true);

        var name = file.name.replace(/ /g, '_');
        var s3upload = s3upload != null ? s3upload : new S3Upload({
          file_dom_selector: 'note-file',
          s3_sign_put_url: '/api/v1/sign_upload',
          s3_object_name: ENV+'/'+uuid.v4()+'/'+name,
          onProgress: function(percent, message) {
            $('.loader-bar').width(percent * 4);
          },
          onFinishS3Put: function(public_url) {
            args["attachment"] = public_url;
            NotesStore.create(args).then(function() {
              p.clearForm();
              p.setState({notes: NotesStore.getState().notes});
              $('.note-submit').attr('disabled', false);
              $('.loader-bar').width(0)
            });
          },
          onError: function(status) {
            console.log('Upload error: ', status);
          }
        });
      } else {
        NotesStore.create(args).then(function() {
          p.clearForm();
          p.setState({notes: NotesStore.getState().notes});
        });
      }
  },
  renderNotesList: function() {
    var notes = $.map(this.state.notes, function(note) {
      return (
        <TextListItem key={note.id} user={note.user} body={note.body} date={note.created_at} attachment={note.attachment} />
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
              <form id="note-form" ref="form" onSubmit={this.save}>
                <textarea placeholder="New note here..." ref="body"></textarea>
                <div className="attachment">
                  <input type="file" className="file-input" id="note-file" ref="file" />
                </div>
                <button type="submit" className="note-submit">Submit</button>
              </form>
            </div>
            <div className="loader-bar"></div>
          </div>
        </div>
      </div>
    );
  }
});
