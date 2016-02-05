var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var FifaDashboard = React.createClass({
  mixins: [DashboardMixin],
  getInitialState: function() {
    var dateRange = this.getDateRange();
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
      this.getRepScores();
    }.bind(this));
  },
  defaultStartInverval: 35,
  defaultStartDate: moment().subtract(this.defaultStartInverval, 'days').toDate(),
  getDateRange: function (selectedRange) {
    var daysAgo = selectedRange || this.defaultStartInverval;
    var endDate = moment(new Date()).add(1, 'days').toDate();
    var startDate = moment(endDate).subtract( daysAgo, 'days').toDate();

    return {
      endDate: endDate,
      startDate: startDate
    };
  },
  getDateRangeCadence: function (numberOfDays) {
    var cadence = 'daily';

    if (numberOfDays > 60) {
      cadence = 'monthly';
    } else if (numberOfDays > 21) {
      cadence = 'weekly';
    }

    return cadence;
  },
  onDateRangeSelect: function (startDate, endDate) {
    var numberOfDays = moment.duration(endDate.diff(startDate)).asDays();

    // TODO refactor this function
    var dateRange = this.getDateRange(numberOfDays);
    var cadence = this.getDateRangeCadence(numberOfDays);

    var config = _.extend(dateRange, {cadence: cadence});

    this.setState(config, function () {
      this.getRepScores();
    }.bind(this));
  },
  getRepScores: function () {
    var params = {
      start_date: moment(this.state.startDate).format('YYYY-MM-DD'),
      end_date: moment(this.state.endDate).format('YYYY-MM-DD'),
      cadence: this.state.cadence
    };

    RepScoresStore.list(params).then(function (data) {
      var socialAvg, newsAvg, overallAvg, avgTrend;
      data = _.sortBy(data, 'date');

      socialAvg = RepScoresStore.getRepScoreAvg('social_score', data);
      newsAvg = RepScoresStore.getRepScoreAvg('news_score', data);
      overallAvg = (socialAvg + newsAvg) / 2;
      avgTrend = RepScoresStore.getAvgTrend(data);

      this.setState({
        repScores: {
          raw: data,
          socialAvg: socialAvg,
          newsAvg: newsAvg,
          overallAvg: overallAvg,
          avgTrend: avgTrend
        }
      });
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
