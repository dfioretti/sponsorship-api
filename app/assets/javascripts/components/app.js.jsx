var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var App = React.createClass({

  renderNav: function() {
    return <Nav {...this.props} />;
  },
  render: function() {
    var cn = "logged-out"

    return (
      <div id="main" className={cn}>
        {this.renderNav()}
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});
