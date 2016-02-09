var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var FifaDashboard = React.createClass({
  mixins: [
    DashboardMixin,
    DateRangeMixin
  ],
  getInitialState: function() {
    var dateRange = this.getInitialDateRange();
    var cadence = this.getDateRangeCadence(this.defaultStartInverval);
    return _.extend({dashboardLoaded: false}, dateRange, { cadence: cadence });
  },
  componentWillMount: function() {
    this.props.setTitle('fifa');
  },
  componentWillReceiveProps: function(newProps) {
    DashboardsStore.getFifa().then(function(dashboard) {
      this.setState({dashboardState: DashboardsStore.getState().current, dashboardLoaded: true});
      this.handleChange();
      this.setupGrid();
      $('.modules-container').trigger('ss-rearrange');
    }.bind(this))
    .then(function () {
      this.getRepScores(this.state);
    }.bind(this));
  },
  mapModule: function(name, state) {
    var el, hidden;
    if (state == "off")
      hidden = true;

    switch (name) {
      case 'teneo_rep_score':
        el = <RepScore hidden={hidden} key={name} repScores={this.state.repScores} cadence={this.state.cadence} />
        break;
      case 'insights_implications':
        el = <InsightsImplications hidden={hidden} key={name} company_id={this.state.dashboardState.company_id}/>
        break;
      case 'global_hotspots':
        el = <GlobalHotspots hidden={hidden} key={name}/>
        break;
      case 'top_global_influencers':
        el = <GlobalInfluencers hidden={hidden} key={name}/>
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
          <Sidebar {...this.props} dashboardState={dashboardState.state} repScores={this.state.repScores} dashboardType="fifa" handleToggle={this.handleToggle} startDate={this.state.startDate} endDate={this.state.endDate} onDateRangeSelect={this.onDateRangeSelect}/>
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
