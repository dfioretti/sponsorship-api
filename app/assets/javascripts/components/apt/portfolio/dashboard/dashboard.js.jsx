var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var PortfolioDashboard = React.createClass({
  mixins: [
    DashboardMixin,
    DateRangeMixin,
    FluxMixin
  ],
  getInitialState: function() {
    return {};
  },
  getComponentFromFlux: function(cid) {
    return flux.store("ComponentsStore").getComponent(cid);
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
  },
  mapModule: function(name, state) {
    var el, hidden;
    hidden = false;
    if (name.indexOf('custom_component') > -1) {
      console.log(name);
      var component = this.getComponentFromFlux(parseInt(name.split("_").pop(-1)));
      el = <DynamicComponent key={component.id} component={component} />
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
          el = <ScoreTrend hidden={hidden} key={name}  title="Top 5 Passion Scores"  />
          break;
        case 'portfolio_tree_map':
          el = <PortfolioTreemap hidden={hidden} key={name} />
          break;
        }
    }
    return el;
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
          <AppSidebar view="dashboard" />
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
