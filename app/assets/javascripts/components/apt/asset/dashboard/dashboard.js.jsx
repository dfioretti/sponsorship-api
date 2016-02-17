var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var AssetDashboard = React.createClass({
  mixins: [DashboardMixin],
  getInitialState: function() {
    return {dashboardLoaded: false, assetLoaded: false};
  },
  componentWillMount: function() {
    this.props.setTitle('apt');

    AssetsStore.setCurrent(this.props.params.id);

    NotesStore.setCompanyId(this.props.params.id);

    DashboardsStore.getAsset(this.props.params.id).then(function(){
      alert("uh");
      this.setState({dashboardState: DashboardsStore.getState().current, dashboardLoaded: true});
      console.log(this);
      console.log(DashboardsStore.getState().current);

      if (this.state.dashboardLoaded && this.state.assetLoaded) {
        this.setupGrid();
      }
    }.bind(this));

    if (AssetsStore.getState().ready) {
      this.setState({assetLoaded: true});
    }

    AssetsStore.on("update", function() {
      AssetsStore.setCurrent(this.props.params.id);
      this.setState({assetLoaded: true});
      if (this.state.dashboardLoaded && this.state.assetLoaded) {
        this.setupGrid();
      }
    }.bind(this));
  },
  componentWillReceiveProps: function(newProps) {
    if (newProps.params.id !== this.props.params.id) {
      this.props.setTitle('dashboard');

      AssetsStore.setCurrent(newProps.params.id);

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
    if (this.state.dashboardLoaded && this.state.assetLoaded) {
      var dashboardState = this.state.dashboardState;
      return (
        <div className="dashboard">
          <Sidebar {...this.props} dashboardState={dashboardState.state} dashboardType="asset" handleToggle={this.handleToggle}/>
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

