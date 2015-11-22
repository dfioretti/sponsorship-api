var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var Dashboard = React.createClass({
  getInitialState: function() {
    return {loaded: false};
  },
  componentWillMount: function() {
    this.props.setTitle('dashboard');

    CompaniesStore.setCurrent(this.props.params.id);

    DashboardsStore.getCurrent(this.props.params.id).then(function(){
      this.setState({dashboardState: DashboardsStore.getState().current, loaded: true});

      $('.modules-container').shapeshift({
        selector: ".dashboard-module",
        handle: ".drag-handle",
        align: "left",
        autoHeight: false,
        gutterX: 20,
        gutterY: 20,
        paddingX: 20,
        paddingY: 20
      });

      $('.modules-container').on('ss-drop-complete', function(e, selected) {
        this.updateDashboardState(this.getDashboardState());
      }.bind(this));
    }.bind(this));
  },
  componentWillReceiveProps: function(newProps) {
    if (newProps.params.id !== this.props.params.id) {
      this.props.setTitle('dashboard');

      CompaniesStore.setCurrent(newProps.params.id);
      DashboardsStore.getCurrent(newProps.params.id).then(function() {
        this.handleChange();
        $('.modules-container').trigger('ss-rearrange');
      }.bind(this));
    }
  },
  handleChange: function() {
    this.setState({dashboardState: DashboardsStore.getState().current});
  },
  handleToggle: function(values, e) {
    var state;
    if (values.value == "on") {
      state = {value: "off", module: values.module}
      this.updateDashboardUI("off", values.module);
    } else {
      state = {value: "on", module: values.module}
      this.updateDashboardUI("on", values.module);
    }
  },
  updateDashboardUI: function(state, name) {
    if (state == "on") {
      $('.dashboard-module#' + name).show();
    } else {
      $('.dashboard-module#' + name).hide();
    }
    $('.modules-container').trigger('ss-rearrange');
    this.updateDashboardState(this.getDashboardState());
  },
  getDashboardState: function() {
    var dashboardState = {};

    $('.modules-container').children().each(function() {
      var toggle = $(this).is(":visible") ? "on" : "off"
      dashboardState[$(this).attr('id')] = {index: $(this).index(), toggle: toggle}
    });

    var did = DashboardsStore.getState().current.id
    return {id: did, state: dashboardState};
  },
  updateDashboardState: function(state) {
    DashboardsStore.update(state).then(function(dashboard){
      this.handleChange();
    }.bind(this));
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
    if (this.state.loaded) {
      var dashboardState = this.state.dashboardState;
      return (
        <div className="dashboard">
          <Sidebar {...this.props} dashboardState={dashboardState.state} handleToggle={this.handleToggle}/>
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
