var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var ScoreEditor = React.createClass({
  mixins: [
    DashboardMixin,
  ],
  getInitialState: function() {
    return { scoreLoaded: false };
  },
  componentDidMount: function() {
    console.log("didmt");
    console.log(this.state);
    console.log(this.state.score);
    if (this.state.scoreLoaded) {
      $('#score-name').val(this.state.score.name);
      $('#score-asset-set').val(this.state.score.asset_set_name);
      initilizeScoreCanvas(this.state.score.score);
    }
    $("#hackback").click(function(e) {
      ReactRouter.HashLocation.pop();
      //Navigation.goBack();
    });
  },
  componentDidUpdate: function() {
    console.log("didup21");
    if (this.state.scoreLoaded) {
      $('#score-name').val(this.state.score.name);
      $('#score-asset-set').val(this.state.score.asset_set_name);
      initilizeScoreCanvas(this.state.score.score);
    }
      console.log("didup");
  },
  updateView: function() {
  },
  saveScore: function() {
    var score = this.state.score;
    var imageParams = {
      "size": new go.Size(290, 220)
    };
    var scoreImage = myDiagram.makeImageData();
    score['score'] = myDiagram.model.toJson();
    score['image'] = scoreImage;
    score['name'] = $('#score-name').val();
    score['asset_set_name']= $('#score-asset-set').find(":selected").text();

    // i don't know why these callbacks don't work, guess i should probably figure out how react works?
    ScoresStore.update(score, function(score) {
      console.log(score);
      console.log("update");
      this.setState({score: score});
      setAlert("Score model saved2", "notice");
      this.handleChange();
    }.bind(this));
    setAlert("Score model saved!", "notice");
  },
  componentWillMount: function() {
    //this.props.setTitle('Score Editor');
    console.log("yere");
    console.log(this.props);
    console.log(this.props.params);
    console.log(this.props.query);
    console.log(this.props.params.id);
    var sid = this.props.params.id;
    console.log("the SID: " + sid);
    if (ScoresStore.getState().ready) {
      ScoresStore.setCurrent(sid);
    }
    this.setState({scoreId: sid });

    ScoresStore.getCurrent(sid).then(function(current) {
      console.log("current..");
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
    console.log("will rec prop " + newProps);
    console.log(newProps.params);
    if (newProps.params.id !== this.props.params.id) {
      this.props.setTitle('apt');

      //AssetsStore.setCurrent(newProps.params.id);

    //  NotesStore.setCompanyId(newProps.params.id);
    //  DashboardsStore.getAsset(newProps.params.id).then(function() {
    //    this.handleChange();
  //      $('.modules-container').trigger('ss-rearrange');
      //}.bind(this));
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
  noway: function() {
    console.log("nope");
    //alert("nah");
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
        <ComponentPane parent={this} score={score}/>
      </div>
    );
  },
  renderTop: function() {
    console.log("CALLED SUB");
    var link = '/apt/portfolio/dashboard';
    return (
      <div className="details-subnav">
        <div  className="details-left-nav">
            <div id="hackback"  className="back-icon"></div>
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
