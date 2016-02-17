var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var PortfolioDashboard = React.createClass({
  mixins: [DashboardMixin],
  getInitialState: function() {
    return {dashboardLoaded: false, companyLoaded: false};
  },
  componentWillMount: function() {
    this.props.setTitle('Asset Dashboard');

    CompaniesStore.setCurrent(this.props.params.id);

    NotesStore.setCompanyId(this.props.params.id);

    DashboardsStore.getCurrent(this.props.params.id).then(function(){
      this.setState({dashboardState: DashboardsStore.getState().current, dashboardLoaded: true});

      if (this.state.dashboardLoaded && this.state.companyLoaded) {
        this.setupGrid();
      }
    }.bind(this));

    if (CompaniesStore.getState().ready) {
      this.setState({companyLoaded: true});
    }

    CompaniesStore.on("update", function() {
      CompaniesStore.setCurrent(this.props.params.id);
      this.setState({companyLoaded: true});
      if (this.state.dashboardLoaded && this.state.companyLoaded) {
        this.setupGrid();
      }
    }.bind(this));
  },
  componentWillReceiveProps: function(newProps) {
    if (newProps.params.id !== this.props.params.id) {
      this.props.setTitle('Asset Dashboard');

      CompaniesStore.setCurrent(newProps.params.id);
      NotesStore.setCompanyId(newProps.params.id);
      DashboardsStore.getCurrent(newProps.params.id).then(function() {
        this.handleChange();
        $('.modules-container').trigger('ss-rearrange');
      }.bind(this));
    }
  },
  mapModule: function(name, state) {
    var el, hidden;
    if (state == "off")
      hidden = true;

    var company = CompaniesStore.getState().current;
    switch (name) {
      case 'risk_assessment':
        el = <RiskAssessment company={company} hidden={hidden} key={name}/>
        break;
      case 'notes':
        el = <Notes company={company} hidden={hidden} key={name}/>
        break;
      case 'risk_indicators':
        el = <RiskIndicators company={company} hidden={hidden} key={name}/>
        break;
      case 'historical_precedent':
        el = <HistoricalPrecedent company={company} hidden={hidden} key={name}/>
        break;
      case 'likely_attackers':
        el = <LikelyAttackers company={company} hidden={hidden} key={name}/>
        break;
      case 'social_sentiment':
        el = <SocialSentiment company={company} hidden={hidden} key={name}/>
        break;
      case 'key_social_posts':
        el = <KeySocialPosts company={company} hidden={hidden} key={name}/>
        break;
      case 'general_financials':
        el = <GeneralFinanacials company={company} hidden={hidden} key={name}/>
        break;
      case 'iss_governance':
        el = <IssGovernance company={company} hidden={hidden} key={name}/>
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

    if (this.state.dashboardLoaded && this.state.companyLoaded) {
      var dashboardState = this.state.dashboardState;
      return (
        <div className="dashboard">
          <Sidebar {...this.props} dashboardState={dashboardState.state} dashboardType="portfolio" handleToggle={this.handleToggle}/>
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

