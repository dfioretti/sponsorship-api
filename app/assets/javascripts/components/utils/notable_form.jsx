var NotableForm = React.createClass({
  validateForm: function () {
    var self = this;
    var errors = [];
    var validators = {
      validateBody: {
        shouldValidate: !!this.props.validateBody,
        message: "Body cannot be blank",
        value: ReactDOM.findDOMNode(this.refs.body).value
      },
      validateFile: {
        shouldValidate: !!this.props.validateFile,
        message: "Must attach file",
        value: ReactDOM.findDOMNode(this.refs.file).files[0]
      }
    };

    _.each(validators, function (value, key) {
      if (value.shouldValidate && _.isEmpty(value.value)) {
        errors.push(value.message);
        self.setState({error: value.message});
      }
    });

    return {
      errors: errors
    };
  },
  saveToS3IfUpload: function () {
    var deferred = $.Deferred();

    var file = ReactDOM.findDOMNode(this.refs.file).files[0];
    var args = {body: ReactDOM.findDOMNode(this.refs.body).value, company_id: this.props.company_id};
    $('.note-submit').attr('disabled', true);

    if (typeof(file) != 'undefined') {

      var name = file.name.replace(/ /g, '_');
      var s3upload = s3upload != null ? s3upload : new S3Upload({
        file_dom_selector: 'note-file',
        s3_sign_put_url: '/api/v1/sign_upload',
        s3_object_name: ENV+'/'+uuid.v4()+'/'+name,
        onProgress: function(percent, message) {
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

    console.log(this.validateForm().errors)
    if (this.validateForm().errors.length > 0) {
      return;
    }

    this.saveToS3IfUpload().done(function (args) {
      if (p.props.saveHandler) {
        p.props.saveHandler(args).then(function() {
          p.clear();
          $('.note-submit').attr('disabled', false);
          $('.loader-bar').width(0);
        });
      } else {
        p.clear();
        $('.note-submit').attr('disabled', false);
        $('.loader-bar').width(0);
      }
    });
  },
  clear: function() {
    this.setState({error: null});
    ReactDOM.findDOMNode(this.refs.form).reset();
  },
  render: function () {
    if (this.state && this.state.error) {
      var errorMessage = (
        <div className="error-message">{this.state.error}</div>
      );
    }

    return (
      <div>
        <div className="new-note">
          {errorMessage}
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