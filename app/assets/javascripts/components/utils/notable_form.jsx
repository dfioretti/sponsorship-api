var NotableForm = React.createClass({
  saveToS3IfUpload: function () {
    var deferred = $.Deferred();

    var file = ReactDOM.findDOMNode(this.refs.file).files[0];
    var args = {body: ReactDOM.findDOMNode(this.refs.body).value, company_id: this.props.company_id};
    $('.note-submit').attr('disabled', true);

    console.log('savetos3')

    if (typeof(file) != 'undefined') {

      var name = file.name.replace(/ /g, '_');
      var s3upload = s3upload != null ? s3upload : new S3Upload({
        file_dom_selector: 'note-file',
        s3_sign_put_url: '/api/v1/sign_upload',
        s3_object_name: ENV+'/'+uuid.v4()+'/'+name,
        onProgress: function(percent, message) {
          console.log(percent)
          $('.loader-bar').width(percent * 4);
        },
        onFinishS3Put: function(public_url) {
          args.attachment = public_url;
          deferred.resolve(args);
        },
        onError: function(status) {
          console.log('Upload error: ', status);
          deferred.reject();
        }
      });
    } else {
      deferred.resolve(args);
    }

    return deferred.promise();
  },
  save: function(e) {
    e.preventDefault();

    var p = this;

    var body = ReactDOM.findDOMNode(p.refs.body).value;


    console.log('save')
    if (body === '') {
      p.setState({error: "Body cannot be blank"});
      return;
    }

    this.saveToS3IfUpload().done(function (args) {
      console.log(args)
      NotesStore.create(args).then(function() {
        p.clear();
        $('.note-submit').attr('disabled', false);
        $('.loader-bar').width(0)

        if (p.props.saveHandler) {
          p.props.saveHandler();
        }
      });
    });
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