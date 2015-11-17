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
          <div className="nav navbar-nav navbar-right nav-user">
            <div className="nav-user-image">
              <span className="user-icon"></span>
            </div>
            {this.state.name}
          </div>
        </div>
      </nav>
    );
  }
});
