var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var AssetSetEditor = React.createClass({
  mixins: [DashboardMixin],
  getInitialState: function() {
    return { assetSetLoaded: false };
  },
  componentDidMount: function() {
      this.setupGrid();
  },
  componentWillMount: function() {
    console.log("set editor will mount");
    this.props.setTitle('Asset Set Editor');
    this.setState({assetSetId: this.props.params.id});
    /*
    AssetSetsStore.on("update", function() {
      alert("set update");

    }.bind(this));
    */

  },
  componentWillReceiveProps: function(newProps) {
    DashboardsStore.getAsset(newProps.params.id).then(function() {
      $('.modules-container').trigger('ss-rearrange');
    }.bind(this));
  },
  mapModule: function(name, state) {

  },
  renderModules: function(dashboardState) {
    var set = this.state.assetSet;
    var assets = this.state.assets
    return (
      <div className="modules-container">
        <AssetTableSelect />
        <SelectedAssets assetSetId={this.state.assetSetId} />
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
