var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var ScoreEditor = React.createClass({
  mixins: [DashboardMixin],
  getInitialState: function() {
    return { scoreLoaded: false };
  },
  componentWillMount: function() {
    //this.props.setTitle('Score Editor');
    //ScoresStore.setCurrent(this.props.params.id);
    ScoresStore.setCurrent(3);

    //ScoresStore.getCurrent(this.props.params.id).then(function(current) {
    ScoresStore.getCurrent(3).then(function(current) {
      this.setState({scoreLoaded: ScoresStore.getState().ready, score: current });
        if (this.state.scoreLoaded) {
          this.setupGrid();
        }
    }.bind(this));

    ScoresStore.on("update", function() {
      alert("updated!");
    }.bind(this));
    //ScoresStore.setCurrent()
  },
  componentWillReceiveProps: function(newProps) {
    if (newProps.params.id !== this.props.params.id) {
      this.props.setTitle('apt');

      AssetsStore.setCurrent(newProps.params.id);

      NotesStore.setCompanyId(newProps.params.id);
      DashboardsStore.getAsset(newProps.params.id).then(function() {
        this.handleChange();
        $('.modules-container').trigger('ss-rearrange');
      }.bind(this));
    }
  },
  mapModule: function(name, state) {
    var el, hidden;
    if (state == "off")
      hidden = true;

    // TODO: Kill companies to fix notes
    var company = CompaniesStore.getState().current;
    var asset = AssetsStore.getState().current;
    switch (name) {
      case 'asset_overview':
        el = <AssetOverview asset={asset} hidden={hidden} key={name}/>
        break;
      case 'notes':
        el = <Notes company={company} hidden={hidden} key={name}/>
        break;
      case 'social_stats':
        el = <SocialStats asset={asset} hidden={hidden} key={name}/>
        break;
      case 'consumer_survey':
        el = <ConsumerSurvey asset={asset} hiddine={hidden} key={name}/>
        break;
      case 'top_news':
        var start = new Date(2016, 1, 1);
        var end = new Date(2016, 1, 15);
        el = <News hidden={hidden} key={name} startDate={start} endDate={end} />
        break;
    }
    return el
  },
  renderModules: function(dashboardState) {
    //console.log(dashboardState);
    //var modules = $.map(dashboardState, function(v, k){
    //  return this.mapModule(k, v.toggle);
    //}.bind(this));
    var score = ScoresStore.getState().current;

    return (
      <div className="modules-container">
        <ScoreTree />
        <ComponentPane score={score}/>
      </div>
    );
  },
  renderTop: function() {
    console.log("CALLED SUB");
    var link = '/apt/portfolio/dashboard';
    return (
      <div className="details-subnav">
        <div className="details-left-nav">
          <Link to={link}>
            <div className="back-icon"></div>
          </Link>
          <div className="to-dashboard">Back</div>
        </div>
      </div>
    );
  },
  render: function() {
    return (
        <div className="dashboard">
          <AptSidebar {...this.props} dashboardState={""} dashboardType="score-editor" />
            {this.renderTop()}
          <div className="modules-box">
            {this.renderModules(null)}
          </div>
        </div>
      );
    }
});
