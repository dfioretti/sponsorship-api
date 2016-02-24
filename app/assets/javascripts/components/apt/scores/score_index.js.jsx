var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var ScoreIndex = React.createClass({
  mixins: [DashboardMixin],
  getInitialState: function() {
    return { scoresLoaded: false };
  },
  componentWillMount: function() {
    this.props.setTitle('Scores');
    // TODO - make this work
    ScoresStore.on("update", function() {
      this.setState({ scoresLoaded: true });
      if (this.state.scoresLoaded) {
        this.setupGrid();
      }
    }.bind(this));

    ScoresStore.list().then(function() {
      this.setState({ scoresLoaded: ScoresStore.getState().ready });
      if (this.state.scoresLoaded) {
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
    if (this.state.scoresLoaded) {
      return (
        <div className="dashboard">
          <Sidebar {...this.props} dashboardState={""} dashboardType="score-index" />
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
