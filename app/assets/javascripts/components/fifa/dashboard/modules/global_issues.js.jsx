var Link = ReactRouter.Link;

var GlobalIssues = React.createClass({
  mixins: [jScrollpaneMixin],
  getInitialState: function() {
    return {scrollLoaded: false, issues: []};
  },
  componentWillReceiveProps: function(newProps) {
    if (this.props.hidden != newProps.hidden && !newProps.hidden && !this.state.scrollLoaded) {
      if (!this.state.wait) {
        this.setState({scrollLoaded: true});
        $('.global-issues-list-container').jScrollPane();
      }
    }

    this.setState({wait: true}, function(){
      this.getData(newProps);
    }.bind(this));
  },
  getData: function(props) {
    var p = props ? props : this.props;
    var self = this;
    var params = {
      start_date: moment(p.startDate).format('YYYY-MM-DD'),
      end_date: moment(p.endDate).format('YYYY-MM-DD')
    };

    GlobalIssuesStore.list(params).then(function (data) {
      issues = GlobalIssuesStore.aggIssuesByWeightedAvgSentiment('aggregate_issues', data.period_breakdown);

      self.setState({
        issues: issues
      });
    }.bind(this));
  },
  renderList: function() {
    return _.map(this.state.issues, function(issue, i) {
      return(<GlobalIssuesItem key={issue.title} item={issue} />);
    });
  },
  render: function() {
    var detailLink = '/fifa/dashboard/global_issues';
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};

    return (
      <div id="top_global_issues" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <Link to={detailLink} className="expand-handle"></Link>
          <div className="drag-handle"></div>
          <div className="top-title">Top Global Issues</div>
        </div>
        <div className="main">
          <div className="global-issues-list-container" onScroll={this.toggleScrollActive} ref="jScrollContainer">
            <ul className="trend-list light global-issues-list">
              {this.renderList()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});
