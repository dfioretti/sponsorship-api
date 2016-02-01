var GlobalIssuesDetail = React.createClass({
  getInitialState: function() {
    return { topSocialIssues: [], topNewsIssues: [] };
  },
  setGrid: function () {
    $('.details-container').shapeshift({
      selector: ".detail-module",
      handle: ".drag-handle",
      align: "left",
      autoHeight: false,
      gutterX: 20,
      gutterY: 20,
      paddingX: 20,
      paddingY: 20
    });
  },
  componentDidMount: function () {
    this.setGrid();
    this.getDetails();
  },
  componentDidUpdate: function () {
    this.setGrid();
  },
  getDetails: function () {
    var self = this;
    var chartData, topNewsIssues, topSocialIssues;
    GlobalIssuesStore.list().then(function (data) {
      chartData = self.getChartData(data);
      topNewsIssues = GlobalIssuesStore.aggIssuesByWeightedAvgSentiment('news_issues', data);
      topSocialIssues = GlobalIssuesStore.aggIssuesByWeightedAvgSentiment('social_issues', data);

      self.setState({
        topSocialIssues: topSocialIssues,
        topNewsIssues: topNewsIssues,
        globalIssuesChartData: chartData
      });
    });
  },
  getChartData: function (data) {
    var chartData = [];

    var socialIssues = GlobalIssuesStore.aggParentIssuesByVolume('social_issues', data);

    _.each(socialIssues, function (volume, issue) {
      chartData.push({
        value: volume,
        label: issue
      });
      // chartData.labels.push(issue);
      // chartData.data.push(volume);
    });

    return chartData;
  },
  render: function () {
    return (
      <div className="details-container">
        <FifaDoughnutDetail moduleTitle="Top Global Issues Social Media" data={this.state.globalIssuesChartData}></FifaDoughnutDetail>
        <FifaGlobalIssuesCard moduleTitle="Top News Media Issues" issues={this.state.topNewsIssues} />
        <FifaGlobalIssuesCard moduleTitle="Top Social Media Issues" issues={this.state.topSocialIssues} />
        <div id="global-issues-volume" className="detail-module detail-chart">
        </div>
      </div>
    );
  }
});