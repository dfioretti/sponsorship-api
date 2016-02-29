var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var AssetSetList = React.createClass({
  mixins: [DashboardMixin],
  getInitialState: function() {
    return { assetSetsLoaded: false };
  },
  componentWillMount: function() {
    this.props.setTitle('Asset Sets');
    // TODO - make this work
    AssetSetsStore.on("update", function() {
      this.setState({ assetSetsLoaded: true });
      if (this.state.assetSetsLoaded) {
        this.setupGrid();
      }
    }.bind(this));

    AssetSetsStore.list().then(function() {
      this.setState({ assetSetsLoaded: AssetSetsStore.getState().ready });
      if (this.state.assetSetsLoaded) {
        this.setupGrid();
      }
    }.bind(this));
  },
  renderModules: function() {
    var scores = ScoresStore.getState().scores;
    // this is lazy, but i don't really feel like
    // fucking with this anymore
    return (
      <div className="modules-container">
        <CreateScore />
        {scores.map(function(score) {
          return <ScoreCard score={score} />
        })}
      </div>
    );
  },
  render: function() {
    console.log(this.state);
    if (this.state.assetSetsLoaded) {
      return (
        <div className="dashboard">
          <Sidebar {...this.props} dashboardState={""} dashboardType="scores" />
          <div className="modules-box">
            {this.renderModules()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="dashboard"></div>
      );
    }
  }
});
