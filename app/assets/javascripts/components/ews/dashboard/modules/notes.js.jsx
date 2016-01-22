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
      $('.notes-list').jScrollPane({contentWidth: '0px'});
      this.setState({scrollLoaded: true});
    }
  },
  componentWillReceiveProps: function(newProps) {
    this.addNote();

    if (this.props.hidden != newProps.hidden && !newProps.hidden && !this.state.scrollLoaded) {
      this.setState({scrollLoaded: true});
      $('.notes-list').jScrollPane({contentWidth: '0px'});
    }
  },
  componentWillUnmount: function() {
    clearTimeout(this.state.timeoutId);
  },
  addNote: function() {
    console.log('on successful save')
    if (typeof($('.notes-list').data('jsp')) != "undefined") {
      $('.notes-list').data('jsp').destroy();
      this.setState({notes: NotesStore.getState().notes}, function() {
        $('.notes-list').jScrollPane({contentWidth: '0px'});
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
    if (this.state.error) {
      var errorMessage = (
        <div className="error-message">{this.state.error}</div>
      );
    }

    return (
      <div id="notes" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Team Notes</div>
        </div>
        <div className="main">
          {this.renderNotesList()}
          <NotableForm errorMessage={errorMessage} company_id={this.props.company.id} saveHandler={this.addNote} />
        </div>
      </div>
    );
  }
});
