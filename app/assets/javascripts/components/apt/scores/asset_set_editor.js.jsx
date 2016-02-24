var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var AssetSetEditor = React.createClass({
  mixins: [DashboardMixin],
  getInitialState: function() {
    return { scoreLoaded: false };
  },
  componentWillMount: function() {
  },
  componentWillReceiveProps: function(newProps) {
  },
  mapModule: function(name, state) {

  },
  renderModules: function(dashboardState) {
    return (
      <div className="modules-container">
        <AssetTableSelect />
      </div>
    );
  },
  render: function() {
    return (
        <div className="dashboard">
          <Sidebar {...this.props} dashboardState={""} dashboardType="score-editor" />
          <div className="modules-box">
          </div>
        </div>
      );
    }
});
