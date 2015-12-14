var Notes = React.createClass({
  getInitialState: function() {
    return {scrollLoaded: false, notes: NotesStore.getState().notes};
  },
  componentDidMount: function() {
    var s = this;
    (function poll(){
      var timeoutId = setTimeout(function(){
        NotesStore.poll(s.props.company.id).then(function(notes){
          s.addNote();
          poll();
        });
      }, 10000);
      s.setState({timeoutId: timeoutId})
    })();

    if (!this.state.scrollLoaded && !this.props.hidden) {
      $('.notes-list').jScrollPane();
      this.setState({scrollLoaded: true});
    }
  },
  componentWillReceiveProps: function(newProps) {
    this.addNote();

    if (this.props.hidden != newProps.hidden && !newProps.hidden && !this.state.scrollLoaded) {
      this.setState({scrollLoaded: true});
      $('.notes-list').jScrollPane();
    }
  },
  componentWillUnmount: function() {
    clearTimeout(this.state.timeoutId);
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
              p.addNote();
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
          p.addNote();
        });
      }
  },
  addNote: function() {
    if (typeof($('.notes-list').data('jsp')) != "undefined") {
      $('.notes-list').data('jsp').destroy();
      this.setState({notes: NotesStore.getState().notes}, function() {
        $('.notes-list').jScrollPane();
        $('.notes-list').data('jsp').addHoverFunc();
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
        </div>
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
    );
  }
});
