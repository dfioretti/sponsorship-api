var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var Nav = React.createClass({

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
            <span className="user-icon"></span>
          </div>
        </div>
      </nav>
    );
  }
});
