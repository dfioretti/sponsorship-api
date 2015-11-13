var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var PasswordRecovery = React.createClass({
  recoverPassword: function(e) {
    e.preventDefault();

    var params = {
      email: ReactDOM.findDOMNode(this.refs.email).value
    };

    Dispatcher.post(APIEndpoints.PASSWORD, params)
  },
  render: function() {
    return (
      <div className="centered">
        <div className="form-container">
          <div className="image-top">
            <img src=""/>
          </div>
          <form onSubmit={this.recoverPassword}>
            <div className="form-group">
              <span className="text-icon email"></span>
              <input type="text" className="form-control" ref="email" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <button className="pull-right btn primary" type="submit">Reset</button>
            </div>
          </form>
        </div>
        <div className="links">
          <Link to="account_login">Account Login</Link>
        </div>
      </div>
    );
  }
});
