var NotableForm = React.createClass({
  save: function(e) {
    e.preventDefault();

    var p = this;

    var body = ReactDOM.findDOMNode(p.refs.body).value;

    if (body === '') {
      p.setState({error: "Body cannot be blank"});
      return;
    }

    var file = ReactDOM.findDOMNode(this.refs.file).files[0];
    var args = {body: body, company_id: p.props.company_id};

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
              p.clear();
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
          p.clear();
          p.addNote();
        });
      }
  },
  clear: function() {
    this.setState({error: null});
    ReactDOM.findDOMNode(this.refs.form).reset();
  },
  render: function () {
    return (
      <div>
        <div className="new-note">
          {this.props.errorMessage}
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
    );
  }
})