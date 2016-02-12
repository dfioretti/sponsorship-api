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
      this.setState(_.extend(defaults, repScores));
    }.bind(this));
  },
  renderDetails: function() {
    var self = this;
    var supportedDetailModules = {
      global_issues: <GlobalIssuesDetail startDate={this.state.startDate} endDate={this.state.endDate} cadence={this.state.cadence}/>,
      global_influencers: <GlobalInfluencersDetail startDate={this.state.startDate} endDate={this.state.endDate} />
    };

    var detailType = this.props.params.detail_type;
    return supportedDetailModules[detailType];
  },
  render: function() {
    return (
      <div className="company-detail fifa-detail">
        <Sidebar {...this.props} dashboardType="fifa" minimal repScores={this.state.repScores} startDate={this.state.startDate} endDate={this.state.endDate} onDateRangeSelect={this.onDateRangeSelect}/>
        {this.renderDetails()}
      </div>
    );
  }
});
