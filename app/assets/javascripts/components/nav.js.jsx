var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var Nav = React.createClass({
  componentWillMount: function() {
    var st = PubSub.subscribe('auth.validation.success', function(ev, user) {
      this.setState({name: user.name, image: user.image});
    }.bind(this));
    var ut = PubSub.subscribe('auth.signOut.success', function(ev, user) {
      this.setState({name: null, image: null});
    }.bind(this));
    this.setState({st: st, ut: ut});
  },
  componentWillUnmount: function() {
    PubSub.unsubscribe(this.state.st);
    PubSub.unsubscribe(this.state.ut);
  },
  signOut: function() {
    $.auth.signOut();
  },
  render: function() {
    return (
      <nav id="navbar" className="nav navbar-default navbar-fixed-top">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="nav-center">{this.props.title}</div>
        <div className="navbar-collapse collapse">
          <div className="nav navbar-nav navbar-left nav-brand">Teneo</div>
          <ul className="nav navbar-nav navbar-right nav-user">
            <li>
              <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="nav-user-image">
                  <span className="user-icon"></span>
                </div>
                <div className="nav-user-name">
                  {this.state.name}
                </div>
              </a>
              <ul className="dropdown-menu" aria-labelledby="user-dropdown">
                <li><a onClick={this.signOut}>Sign out</a></li>
              </ul>
            </li>
          </ul>

        </div>
      </nav>
    );
  }
});
