var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var AssetSetEditor = React.createClass({
  mixins: [DashboardMixin],
  getInitialState: function() {
    return { assetSetLoaded: false };
  },
  componentWillMount: function() {
    this.props.setTitle('Asset Set Editor');
    AssetSetsStore.setCurrent(this.props.params.id);
    AssetSetsStore.getCurrent(this.props.params.id).then(function(current) {
      this.setState({assetSetLoaded: AssetSetsStore.getState().ready, assetSet: current});
      if (this.state.assetSetLoaded) {
        this.setupGrid();
      }
    }.bind(this));

    AssetSetsStore.on("update", function() {
      alert("set update");

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
    var set = AssetSetsStore.getState().current;
    return (
      <div className="modules-container">
        <AssetTableSelect asset_set={set} />
        <SelectedAssets asset_set={set} />
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
