var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var App = React.createClass({
  renderAlerts: function() {
    return <Alerts />;
  },
  renderNav: function() {
    return <Nav {...this.props} />;
  },
  render: function() {
    var cn = "logged-out"

    return (
      <div id="main" className={cn}>
        {this.renderNav()}
        {this.renderAlerts()}
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});
