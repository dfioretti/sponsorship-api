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

    // I think there is an issue with this? error for not settign state...
    DashboardsStore.getFifa().then(function() {
      this.setState({dashboardState: DashboardsStore.getState().current, dashboardLoaded: true});
      if (this.state.dashboardLoaded) {
        this.setupGrid();
      }
    }.bind(this));
    //DashboardsStore.getFifa().then(function(dashboard) {
    //}.bind(this))
    //.then(function () {
      //this.getRepScores(defaults).then(function (repScores) {
      //  var state = _.extend(initialState, defaults, repScores, {dashboardState: DashboardsStore.getState().current, dashboardLoaded: true});
      //  this.setState(state);

    //    this.handleChange();
  //      this.setupGrid();
  //      $('.modules-container').trigger('ss-rearrange');
      //}.bind(this));
  //  }.bind(this));
  },
  mapModule: function(name, state, componentId, componentType, componentTitle) {
    var el, hidden;
    if (state == "off")
      hidden = true;
    //el = <PortfolioTreemap hidden={hidden} key={name} repScores={this.state.repScores} title="Portfolio Allocation" cadence={this.state.cadence} />
    if (name.indexOf('custom_component') > -1) {
      el = <CustomComponent hidden={hidden} componentType={componentType} componentTitle={componentTitle} componentId={componentId} />
    }
    else {
      switch (name) {
        case 'portfolio_map':
          el = <PortfolioMap hidden={hidden} key={name} />
          break;
        case 'portfolio_summary':
          el = <PortfolioSummary hidden={hidden} key={name} />
          break;
        case 'score_trend':
          el = <ScoreTrend hidden={hidden} key={name} repScores={this.state.repScores} title="Top 5 Passion Scores" cadence={this.state.cadence} />
          break;
        case 'portfolio_tree_map':
          el = <PortfolioTreemap hidden={hidden} key={name} />
          break;
    }
  }
    return el
  },
  renderModules: function(dashboardState) {
    var modules = $.map(dashboardState, function(v, k){
      return this.mapModule(k, v.toggle, v.component_id, v.component_type, v.title);
    }.bind(this));

    return (
      <div className="modules-container">
        {modules}
      </div>
    );
  },
  render: function() {
    var dashboardState;
    //<Sidebar {...this.props} dashboardState={dashboardState.state} repScores={this.state.repScores} dashboardType="apt" handleToggle={this.handleToggle} startDate={this.state.startDate} endDate={this.state.endDate} onDateRangeSelect={this.onDateRangeSelect}/>

    if (this.state.dashboardLoaded) {
      var dashboardState = this.state.dashboardState;
      return (
        <div className="dashboard">
          <AptSidebar title="Portfolio Dashboard" dashboardState={dashboardState.state}/>
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
