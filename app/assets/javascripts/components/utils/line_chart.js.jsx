var LineChart = React.createClass({
  mixins: [
    ChartTooltipHandler
  ],
  getInitialState: function() {
    console.log("Get Initial State");
    return {};
  },
  componentDidUpdate: function() {
    if (!this.state.chart) return;
    this.state.chart.update();
  },
  componentWillReceiveProps: function(newProps) {
    console.log("Will Prop");
    if (this.state.chart) this.state.chart.destroy();

    if (this.props.hidden !== newProps.hidden) {
      this.setState({reload: true});
    } else {
      this.buildChart(newProps);
    }
  },
  buildChart: function(props) {
    console.log("Build Chart");
    // TODO: - all the chart data stuff

    this.renderChart();
  },
  getLabels: function() {
    return ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6"];
  },
  renderLegend: function () {
    if (!this.state.data) return;

    return _.map(this.state.data.datasets, function (dataset, i) {
      return(
        <div key={i} className="company-legend">
          <span className="legend-color" style={{backgroundColor: dataset.pointStrokeColor}}></span><span>{dataset.label} ({dataset.summaryNumber.toFixed(1)})</span>
        </div>
      );
    });
  },
  renderChart: function() {
    var self = this;
    console.log("Render Chart");
    var ctx = $("#custom-chart").get(0).getContext("2d");
    var labels = this.getLabels();
    var nyy = [ 92.3, 84.4, 84.1, 98.2, 58.2, 87.4];
    var nym = [ 82.3, 94.4, 94.1, 88.2, 78.2, 77.4];
    var nyi = [ 72.3, 74.4, 74.1, 78.2, 88.2, 97.4];
    var nyg = [ 62.3, 64.4, 44.1, 38.2, 38.2, 57.4];
    var nyj = [ 52.3, 44.4, 64.1, 68.2, 38.2, 67.4]

    var rawData = [nyy, nym, nyi, nyg, nyj];
    var dataSets = [];
    for (var i = 0; i < rawData.length; i++) {
      dataSets.push(this.dataSetForIndex(i, "label" + i, rawData[i]));
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

        //var rawData = props.repScores.raw;
        //var dateOfToolTip = rawData[labels.indexOf(tooltip.title)].date;

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
    var hide = { display : 'none' };

      return (
        <div>
          <div style={hide} className="chart-legend">
            {this.renderLegend()}
          </div>
          <canvas id="custom-chart" width="380px" height="240px"></canvas>
          <div ref="chartjsTooltip" id="chartjs-tooltip"></div>
       </div>
      );
  }

});
