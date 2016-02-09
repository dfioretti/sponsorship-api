var FifaGlobalIssuesVolumeDetail = React.createClass({
  mixins: [
    ChartTooltipHandler
  ],
  getInitialState: function () {
    return {};
  },
  componentWillMount: function () {
    this.chartId = uuid.v4();
  },
  componentWillReceiveProps: function (newProps) {
    // console.log("receive newProps -------")
    // console.log(newProps)
    // console.log('------------')
    if (this.state.chart) {
      this.state.chart.destroy();
    }

    this.renderChart(newProps);
  },
  chartConfig: [
    {
      fillColor: "rgba(80,227,194,0)",
      strokeColor: "#50e3c2",
      pointColor: "#50e3c2",
      pointStrokeColor: "#50e3c2",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#50e3c2",
    },
    {
      fillColor: "rgba(231,105,89,0)",
      strokeColor: "#e76959",
      pointColor: "#e76959",
      pointStrokeColor: "#e76959",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "#e76959"
    }
  ],
  getLabels: function (data) {
    return _.map(data[0].points, function (entry) {
      var label;

      if (this.props.cadence === "monthly") {
        label = moment(entry.date).format('MMMM');
      } else {
        label = moment(entry.date).format('MMM D');
      }

      return label;
    }.bind(this));
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
    var topIssues = _.clone(data).splice(0,2);
    var chartConfig = this.chartConfig;
    var self = this;

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
    var chart = new Chart(ctx).Line(chartData, {
      animation: false,
      tooltipFontSize: 9,
      tooltipFillColor: 'rgba(255,255,255,0.8)',
      tooltipFontStyle: 'Avenir-Book',
      tooltipFontColor: '#333',
      tooltipTitleFontColor: '#333',
      scaleLabel: "<%= ' ' + value%>",
      customTooltips: function (tooltip) {
        if (!self.isTooltip(tooltip)) return;

        var dateOfToolTip = data[0].points[self.getLabels(data).indexOf(tooltip.title)].date;
        self.renderTooltip(tooltip, dateOfToolTip.format('MMMM Do, YYYY'), chartData);
      }
    });

    this.setState({
      chart: chart
    });
  },
  render: function () {
    return (
      <div className="detail-module detail-chart volume-chart">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.moduleTitle}</div>
        </div>
        <div className="main main-centered">
          <ul className="chart-legend">
            {this.renderLegend()}
          </ul>
          <canvas width="570px" height="300px" id={this.chartId}></canvas>
          <div ref="chartjsTooltip" id="chartjs-tooltip" ></div>
        </div>
      </div>
    );
  }
});