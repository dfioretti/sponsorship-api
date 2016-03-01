var RouteHandler = ReactRouter.RouteHandler,
  Link = ReactRouter.Link;

var DashboardDetail = React.createClass({
  getInitialState: function() {
    return {};
  },
  renderModules: function() {
    return (
      <div className="modules-container">
        <CreateComponent />
      </div>
    );
  },
  render: function() {
      <div className="company-detail">
        <AptSidebar title="Create Component" />
        <div className="modules-box">
          {this.renderModules()}
        </div>
      </div>
  }


});
