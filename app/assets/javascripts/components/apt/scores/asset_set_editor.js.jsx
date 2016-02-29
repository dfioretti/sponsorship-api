var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var AssetSetEditor = React.createClass({
  mixins: [DashboardMixin],
  getInitialState: function() {
    return { assetsLoaded: false };
  },
  componentWillMount: function() {
    this.props.setTitle('Asset Set Editor');
    DashboardsStore.getAsset(7).then(function() {
      this.setupGrid();
    }.bind(this));
  },
  componentWillReceiveProps: function(newProps) {
    DashboardsStore.getAsset(newProps.params.id).then(function() {
      this.handleChange();
      $('.modules-container').trigger('ss-rearrange');
    }.bind(this));
  },
  mapModule: function(name, state) {

  },
  renderModules: function(dashboardState) {
    return (
      <div className="modules-container">
        <AssetTableSelect />
        <SelectedAssets />
      </div>
    );
  },
  render: function() {
    return (
        <div className="dashboard">
          <Sidebar {...this.props} dashboardState={""} dashboardType="score-editor" />
          <div className="modules-box">
            {this.renderModules(null)}
          </div>
        </div>
      );
    }
});
