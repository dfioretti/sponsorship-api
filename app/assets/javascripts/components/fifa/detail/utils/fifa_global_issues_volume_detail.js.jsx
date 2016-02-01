var FifaGlobalIssuesVolumeDetail = React.createClass({
  componentWillMount: function () {
    this.chartId = uuid.v4();
  },
  componentDidUpdate: function () {
    this.renderChart(this.props);
  },
  renderChart: function (props) {
    if (!props.data) return;

    var topIssues = props.data.splice(0,2);
    var chartConfig = [
      {
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
      },
      {
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)"
      }
    ];

    var chartData = {
      labels: _.map(topIssues[0].points, function (issue, i) { return i; }),
      datasets: _.map(topIssues, function (issue, i) {
        return _.extend({}, {
          label: issue.title,
          data: issue.points
        }, chartConfig[i]);
      })
    };


    console.log(chartData)

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
        <div className="main">
          <canvas width="590px" id={this.chartId}></canvas>
        </div>
      </div>
    );
  }
});