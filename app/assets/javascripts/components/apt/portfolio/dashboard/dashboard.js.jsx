var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var PortfolioDashboard = React.createClass({
  mixins: [
    DashboardMixin,
    DateRangeMixin
  ],
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    this.props.setTitle('apt');
  },
  componentWillReceiveProps: function(newProps) {
    var initialState = {};
    var dateRange = this.getInitialDateRange();
    var cadence = this.getDateRangeCadence(this.defaultStartInverval);
    var defaults =  _.extend({dashboardLoaded: false}, dateRange, {cadence: cadence});

    DashboardsStore.getFifa().then(function(dashboard) {
    }.bind(this))
    .then(function () {
      this.getRepScores(defaults).then(function (repScores) {
        var state = _.extend(initialState, defaults, repScores, {dashboardState: DashboardsStore.getState().current, dashboardLoaded: true});
        this.setState(state);

        this.handleChange();
        this.setupGrid();
        $('.modules-container').trigger('ss-rearrange');
      }.bind(this));
    }.bind(this));
  },
  mapModule: function(name, state) {
    var el, hidden;
    if (state == "off")
      hidden = true;

    switch (name) {
      case 'teneo_rep_score':
        el = <ScoreTrend hidden={hidden} key={name} repScores={this.state.repScores} title="Top 5 Passion Scores" cadence={this.state.cadence} />
        //el = <RepScore hidden={hidden} key={name} repScores={this.state.repScores} cadence={this.state.cadence} />
        break;
      case 'insights_implications':
        el = <InsightsImplications hidden={hidden} key={name} company_id={this.state.dashboardState.company_id}/>
        break;
      case 'global_hotspots':
        el = <PortfolioTreemap hidden={hidden} key={name} repScores={this.state.repScores} title="Top 5 Passion Scores" cadence={this.state.cadence} />
        //el = <GlobalHotspots hidden={hidden} key={name} startDate={this.state.startDate} endDate={this.state.endDate}/>
        break;
      case 'OFFtop_global_influencers':
        el = <GlobalInfluencers hidden={hidden} key={name} startDate={this.state.startDate} endDate={this.state.endDate}/>
        break;
      case 'top_news':
        el = <News hidden={hidden} key={name} startDate={this.state.startDate} endDate={this.state.endDate} />
        break;
      case 'top_global_issues':
        el = <GlobalIssues hidden={hidden} key={name} startDate={this.state.startDate} endDate={this.state.endDate} />
        break;
    }
    return el
  },
  renderModules: function(dashboardState) {
    var modules = $.map(dashboardState, function(v, k){
      return this.mapModule(k, v.toggle);
    }.bind(this));

    return (
      <div className="modules-container">
        {modules}
      </div>
    );
  },
  render: function() {
    var dashboardState;

    if (this.state.dashboardLoaded) {
      var dashboardState = this.state.dashboardState;
      return (
        <div className="dashboard">
          <Sidebar {...this.props} dashboardState={dashboardState.state} repScores={this.state.repScores} dashboardType="apt" handleToggle={this.handleToggle} startDate={this.state.startDate} endDate={this.state.endDate} onDateRangeSelect={this.onDateRangeSelect}/>
          <div className="modules-box">
            {this.renderModules(dashboardState.state)}
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
