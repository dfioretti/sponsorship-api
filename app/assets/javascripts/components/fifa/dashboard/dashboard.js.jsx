var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var FifaDashboard = React.createClass({
  mixins: [DashboardMixin],
  getInitialState: function() {
    var endDate = new Date();
    var startDate = moment(endDate).subtract(this.defaultRange, 'days').toDate();

    return {dashboardLoaded: false, endDate: new Date(), startDate: startDate};
  },
  componentWillMount: function() {
    this.props.setTitle('fifa');

    DashboardsStore.getFifa().then(function(){
      this.setState({dashboardState: DashboardsStore.getState().current, dashboardLoaded: true});

      if (this.state.dashboardLoaded) {
        this.setupGrid();
      }
    }.bind(this));
  },
  componentWillReceiveProps: function(newProps) {
    DashboardsStore.getFifa().then(function(dashboard) {
      this.handleChange();
      $('.modules-container').trigger('ss-rearrange');
    }.bind(this));
  },
  defaultRange: 35,
  onDateRangeSelect: function (selectedRange) {
    var endDate = new Date();
    var startDate = moment(endDate).subtract(selectedRange, 'days').toDate();

    this.setState({
      endDate: endDate,
      startDate: startDate
    });
  },
  mapModule: function(name, state) {
    var el, hidden;
    if (state == "off")
      hidden = true;

    switch (name) {
      case 'teneo_rep_score':
        el = <RepScore hidden={hidden} key={name} startDate={this.state.startDate} endDate={this.state.endDate} />
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
          <Sidebar {...this.props} dashboardState={dashboardState.state} dashboardType="fifa" handleToggle={this.handleToggle} defaultRange={this.defaultRange} onDateRangeSelect={this.onDateRangeSelect}/>
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
