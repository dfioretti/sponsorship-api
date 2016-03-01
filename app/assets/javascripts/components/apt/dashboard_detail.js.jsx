var RouteHandler = ReactRouter.RouteHandler,
  Link = ReactRouter.Link;

var DashboardDetail = React.createClass({
  getInitialState: function() {
    return {};
  },
  renderDetails: function() {
    return (
      <CreateComponent />
    );
  },
  render: function() {
    return (
      <div className="company-detail fifa-detail">
        <AptSidebar title="Create Component" />
        {this.renderDetails()}
      </div>
    );
  }
});
