var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var FifaDetail = React.createClass({
  mixins: [
    DateRangeMixin
  ],
  getInitialState: function() {
    return {};
  },
  componentDidMount: function () {
    var dateRange = this.getInitialDateRange();
    var cadence  = this.getDateRangeCadence(this.defaultStartInverval);
    var defaults = _.extend({dashboardLoaded: false}, dateRange, { cadence: cadence });

    this.getRepScores(defaults).then(function (repScores) {
      this.skipDetailRender = true;
      this.setState(_.extend(defaults, repScores), function () {
        delete this.skipDetailRender;
      }.bind(this));
    }.bind(this));
  },
  getSubNavTitle: function () {
    var titles = {
      global_issues: "Top Global Issues",
      global_influencers: "Top Global Influencers"
    };

    return titles[this.props.params.detail_type];
  },
  renderSubnav: function() {
    var link = '/fifa/dashboard';

    return (
      <div className="details-subnav">
        <div className="details-left-nav">
          <Link to={link}><div className="back-icon"></div></Link>
          <div className="to-dashboard">{this.getSubNavTitle()}</div>
        </div>
      </div>
    );
  },
  renderDetails: function() {
    var self = this;
    var supportedDetailModules = {
      global_issues: <GlobalIssuesDetail startDate={this.state.startDate} endDate={this.state.endDate} cadence={this.state.cadence}/>,
      global_influencers: <GlobalInfluencersDetail />
    };

    var detailType = this.props.params.detail_type;
    return supportedDetailModules[detailType];
  },
  render: function() {
    return (
      <div className="company-detail fifa-detail">
        <Sidebar {...this.props} dashboardType="fifa" minimal repScores={this.state.repScores} startDate={this.state.startDate} endDate={this.state.endDate} onDateRangeSelect={this.onDateRangeSelect}/>
        {this.renderSubnav()}
        <div className="details-box">
          {this.renderDetails()}
        </div>
      </div>
    );
  }
});
