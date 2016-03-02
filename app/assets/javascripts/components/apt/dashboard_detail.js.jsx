var RouteHandler = ReactRouter.RouteHandler,
  Link = ReactRouter.Link;

var DashboardDetail = React.createClass({
  getInitialState: function() {
    return {};
  },
  renderDetails: function() {
    //<CreateComponent />
    //<ScoreEditor />


    return (
      <CreateComponent />
    );
  },
  render: function() {
    // #FAFBFD - color of dashboard in detail-module
    // $dark-blue - color of regualr dash
    return (
      <div className="company-detail fifa-detail">
        <AptSidebar title="Create Component" />
        {this.renderDetails()}
      </div>
    );
  }
});
