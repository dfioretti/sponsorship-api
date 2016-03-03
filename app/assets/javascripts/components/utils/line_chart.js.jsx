var LineChart = React.createClass({
  mixins: [
    ChartTooltipHandler
  ],
  getInitialState: function() {
    return {};
  },
  componentDidUpdate: function() {
    if (!this.state.chart) return;
    this.state.chart.update();
  },
  componentWillMount: function() {
    this.setState({ viewData: this.props.viewData });
    this.setState({ dataLoaded: true});
  },
  componentDidMount: function() {
    if (this.state.dataLoaded) {
      this.buildChart(null);
    }
  },
  componentWillReceiveProps: function(newProps) {
    if (this.state.chart) this.state.chart.destroy();

    if (this.props.hidden !== newProps.hidden) {
      this.setState({reload: true});
    } else {
      this.buildChart(newProps);
    }
  },
  buildChart: function(props) {
    this.renderChart();
  },
  getLabels: function() {
    return this.state.viewData.labels;
  },
  renderLegend: function () {
    if (!this.state.data) return;
    //<span className="legend-color" style={{backgroundColor: dataset.pointStrokeColor}}></span><span>{dataset.label} ({dataset.summaryNumber.toFixed(1)})</span>

    return _.map(this.state.data.datasets, function (dataset, i) {
      return(
        <div key={i} className="company-legend">
          <span className="legend-color" style={{backgroundColor: dataset.pointStrokeColor}}></span><span>{dataset.label}</span>
        </div>
      );
    });
  },
  renderChart: function() {
    var self = this;
    var ctx = $("#custom-line-chart").get(0).getContext("2d");

    var labels = this.getLabels();
    var rawData = this.state.viewData.chartData;
    var names = this.state.viewData.assets;
    var dataSets = [];

    for (var i = 0; i < rawData.length; i++) {
      dataSets.push(this.dataSetForIndex(i, names[i], rawData[i]));
    }
    var data = {
      labels: labels,
      datasets: dataSets,
    }

    this.lineChart = new Chart(ctx).Line(data, {
      animation: true,
      tooltipFontSize: 11,
      tooltipFillColor: 'rgba(255,255,255,0.6)',
      tooltipFontStyle: 'Avenir-Book',
      tooltipFontColor: '#333',
      tooltipTitleFontFamily: 'Avenir-Book',
      tooltipTitleFontColor: '#738694',
      tooltipTitleFontSize: 11,
      tooltipTitleFontStyle: 'normal',
      scaleFontColor: "#fff",
      scaleLineColor: "rgba(255,255,255,0.3)",
      scaleGridLineColor: "rga(255,255,255,0.3)",
      scaleLabel: "<%= ' ' + value%>",
      scaleFontSize: 11,
      scaleShowVerticalLines: false,
      scaleOverride : true,
      scaleSteps : 4,
      scaleBeginAtZero: true,
      scaleStepWidth : 25,
      pointDotRadius : 3,
      customTooltips: function (tooltip) {
        if (!self.isTooltip(tooltip)) return;
        self.renderTooltip(tooltip, "Title", data);
      }
    });

    this.setState({
      data: data,
      chart: this.lineChart
    });

  },
  dataSetForIndex: function(index, label, dataSet) {
    colors = ["#50e3c2", "#f5a623", "#e76959", "#ffd300" ,"#97c93c"]
    return {
        label: label,
        fillColor: "rgba(0,0,0,0)",
        strokeColor: colors[index],
        pointColor: "#fff",
        pointStrokeColor: colors[index],
        pointHighlightFill: "#fff",
        pointHighlightStroke: colors[index],
        data: dataSet,
        summaryNumber: 38.2
    };
  },
  render: function() {
      return (
        <div>
          <div className="chart-legend">
            {this.renderLegend()}
          </div>
          <canvas id="custom-line-chart" width="380px" height="240px"></canvas>
          <div ref="chartjsTooltip" id="linechart-tooltip"></div>
       </div>
      );
  }
});
