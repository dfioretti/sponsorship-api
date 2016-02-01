var FifaGlobalIssuesVolumeDetail = React.createClass({
  componentWillMount: function () {
    this.chartId = uuid.v4();
  },
  componentDidUpdate: function () {
    this.renderChart(this.props);
  },
  chartConfig: [
    {
      fillColor: "rgba(80,227,194,0.2)",
      strokeColor: "#50e3c2",
      pointColor: "#50e3c2",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#50e3c2",
    },
    {
      fillColor: "rgba(231,105,89,0.2)",
      strokeColor: "#e76959",
      pointColor: "#e76959",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#e76959"
    }
  ],
  getLabels: function (data) {
    // assume daily cadence for now, need to refactor for multiple cadences
    return _.map(data[0].points, function (point) {
      return moment(point.date).format('MMM D');
    });
  },
  renderLegend: function () {
    if (!this.props.data) return;

    var topIssues = this.props.data.splice(0,2);

    return _.map(topIssues, function (issue, i) {
      var backgroundColor = this.chartConfig[i].strokeColor;

      return (
        <li key={backgroundColor}>
          <span className="legend-droplet" style={{ borderColor: backgroundColor}}></span>
          <span>{issue.title}</span>
        </li>
      );
    }.bind(this));
  },
  renderChart: function (props) {
    if (!props.data) return;

    var data = props.data;
    var labels = this.getLabels(data);
    var topIssues = data.splice(0,2);
    var chartConfig = this.chartConfig;

    var chartData = {
      labels: labels,
      datasets: _.map(topIssues, function (issue, i) {
        return _.extend({},
          chartConfig[i],
          {
            label: issue.title,
            data: _.map(issue.points, function (point) { return point.volume; })
        });
      })
    };

    var ctx = $("#" + this.chartId).get(0).getContext("2d");

    // TODO Add labels
    new Chart(ctx).Line(chartData);
  },
  render: function () {
    return (
      <div className="detail-module detail-chart">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.moduleTitle}</div>
        </div>
        <div className="main main-centered">
          <ul className="chart-legend">
            {this.renderLegend()}
          </ul>
          <canvas width="570px" height="300px" id={this.chartId}></canvas>
        </div>
      </div>
    );
  }
});