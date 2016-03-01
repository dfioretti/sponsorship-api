var RoundChart = React.createClass({
  getInitialState: function() {
    var d1 = { label: "First Label", value: 3234 };
    var d2 = { label: "Second Label", value: 2342 };
    var d3 = { label: "Third Label", value: 1231 };
    var d4 = { label: "Fourth Label", value: 4231 };
    var d5 = { label: "Fifth Label", value: 2222 };
    var d6 = { label: "Sixth Label", value: 3928 };

    var data = [];
    data.push(d1);
    data.push(d2);
    data.push(d3);
    data.push(d4);
    data.push(d5);
    data.push(d6);

    return { data: data };
  },
  componentWillMount: function() {
    this.chartId = uuid.v4();
  },
  componentDidUpdate: function() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.renderChart(this.props);
  },
  backgroundColor: [
    '#cddc39',
    '#ff9801',
    '#2096f3',
    '#f44336',
    '#673ab7',
    '#124c93',
    '#50e3c2',
    '#26a162',
    '#e76959',
    '#218451',
    '#2d64a5'
  ],
  renderChart: function(props) {
    //if (!props.data) return;
    var data = this.state.data;

    data = _.map(data, function(dataset, i) {
      dataset.color = this.backgroundColor[i];
      return dataset;
    }.bind(this));

    // issue rendering outside of the canvas
    var strokeWidth = 3;
    var ctx = $("#" + this.chartId).get(0).getContext("2d");
    var chartDetail = {
      segmentStrokeWidth: strokeWidth,
      tooltipFontSize: 9,
      tooltipFillColor: 'rgba(255,255,255,0.8)',
      tooltipFontStyle: 'Avenir-Medium',
      tooltipFontColor: '#333',
      animationEasing : "easeOutQuart",
      animateRotate: false,
      animateScale: true,
      animationSteps: 30
    };

    var roundChart;
    console.log(this.props.type);
    if(this.props.type === "doughnut") {
      roundChart = new Chart(ctx).Doughnut(data, chartDetail);
    } else {
      roundChart = new Chart(ctx).Pie(data, chartDetail);
    }
    roundChart.outerRadius -= (strokeWidth/2);
    this.chart = roundChart;
  },
  renderLegend: function() {
    //var data = this.props.data;
    var data = this.state.data;
    return _.map(data, function(pt, i) {
      var backgroundColor = this.backgroundColor[i];
      return (
        <li key={i}>
          <span className="legend-droplet" style={{borderColor: backgroundColor}}></span>
          <span>{pt.label}</span>
        </li>
      );
    }.bind(this));
  },
  render: function() {
    return (
      <div style={{paddingTop: "35px", paddingLeft: "20px"}}>
        <div className="" style={{display: "inline-block", padding: "5px"}}>
          <canvas id={this.chartId} width="190" height="190" style={{width: "190px", height: "190px", padding: "5px"}}></canvas>
        </div>
        <ul className="chart-legend" style={{display: "inline-block", position: "absolute", top: "100px", left: "250px"}}>
          {this.renderLegend()}
        </ul>
      </div>
    )
  }


});
