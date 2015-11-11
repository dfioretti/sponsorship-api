var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var Nav = React.createClass({

  render: function() {
    return (
      <div id="navbar">
        <Link to='sign_in'>Sign In</Link>
        <Link to='sign_up'>Sign Up</Link>
        <Link to='password_recovery'>Password Recovery</Link>
      </div>
    );
  }
});
