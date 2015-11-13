var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var AccountLogin = React.createClass({
  login: function(e) {
    e.preventDefault();

    var params = {
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value,
      remember_me: ReactDOM.findDOMNode(this.refs.remember).value
    };

    Dispatcher.post(APIEndpoints.LOGIN, params)
  },
  render: function() {
    return (
      <div className="centered">
        <div className="form-container">
          <div className="image-top">
            <img src=""/>
          </div>
          <form onSubmit={this.login}>
            <div className="form-group">
              <span className="text-icon email"></span>
              <input type="text" className="form-control" ref="email" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <span className="text-icon password"></span>
              <input type="password" className="form-control" ref="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="checkbox" ref="remember" />
              <label>Remember me</label>
              <button className="pull-right btn primary" type="submit">Login</button>
            </div>
          </form>
        </div>
        <div className="links">
          <Link to="create_account">Create New Account</Link>
          <Link className="pull-right" to="password_recovery">Forgot Password?</Link>
        </div>
      </div>
    );
  }
});
