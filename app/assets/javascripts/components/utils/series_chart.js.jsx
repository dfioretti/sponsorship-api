var SeriesChart = React.createClass({
  mixins: [
    ChartTooltipHandler
  ],
  getInitialState: function() {
    return { chartId: uuid.v4() };
  },
  componentWillMount: function() {
    this.buildDataState(this.props.component);
  },
  buildDataState: function(params) {
    var labels = params.state.labels;
    var dataSets = [],
        i = 0;
    params.state.data.forEach(function(d) {
      dataSets.push(this.dataSetForIndex(i, d.entity, d.values));
      i++;
    }.bind(this));
    this.setState({ data: { labels: labels, datasets: dataSets } });
  },
  componentDidMount: function() {
    this.renderChart();
  },
  renderLegend: function () {
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
    var ctx = $("#" + this.state.chartId).get(0).getContext("2d");
    var chartSettings = {
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
      scaleOverride : false,
      pointDotRadius : 3,
      customTooltips: function (tooltip) {
        if (!self.isTooltip(tooltip)) return;
        console.log(self.state);
        console.log(self.state.data);
        self.renderTooltip(tooltip, "", self.state.data);
      }
    };
    console.log(this.props.component.view);
    if (this.props.component.view === 'lineChart') {
      this.chart = new Chart(ctx).Line(this.state.data, chartSettings);
    } else {
      this.chart = new Chart(ctx).Bar(this.state.data, chartSettings);
    }
    this.setState({ chart: this.chart });
  },
  dataSetForIndex: function(index, label, dataSet) {
    colors = ["#50e3c2", "#f5a623", "#e76959", "#ffd300" ,"#97c93c"];
    var fillColor = "rgba(0,0,0,0)";
    if (this.props.component.view === 'barChart') {
      fillColor = colors[index];
    }
    return {
        label: label,
        fillColor: fillColor,
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
          <canvas id={this.state.chartId} width="380px" height="240px"></canvas>
          <div ref="chartjsTooltip" id="linechart-tooltip"></div>
       </div>
      );
  }
});
