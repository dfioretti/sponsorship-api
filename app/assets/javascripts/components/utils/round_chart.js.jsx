var RoundChart = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    this.setState({viewData: this.props.viewData});
    this.setState({dataLoaded: true});
    this.chartId = uuid.v4();
  },
  componentDidMount: function() {
    this.renderChart(null)
  },
  componentDidUpdate: function() {
    console.log("did");

    if (this.chart) {
      this.chart.destroy();
    }
    this.renderChart(this.props);
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({viewData: this.props.viewData});
      console.log("will prop");
  },
  componentDidUpdate: function() {
    console.log("did update");
  },
  componentDidReceiveProps: function() {
    console.log("did prop");
  },
  backgroundColor: [
    '#2096f3',
    '#e76959',
    '#50e3c2',
    '#f5a623',
    '#2d64a5'
  ],
  renderChart: function(props) {
    console.log("RENDER CHART");
    //if (!props.data) return;
    var data = this.state.viewData;

    data = _.map(data, function(dataset, i) {
      dataset.color = this.backgroundColor[i];
      return dataset;
    }.bind(this));

    // issue rendering outside of the canvas
    var strokeWidth = 1;
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
    var data = this.state.viewData;
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
    console.log("render");
    return (
      <div style={{paddingTop: "35px", paddingLeft: "20px"}}>
        <div className="" style={{display: "inline-block", padding: "5px"}}>
          <canvas id={this.chartId} width="190" height="190" style={{width: "190px", height: "190px", padding: "5px"}}></canvas>
        </div>
        <ul className="chart-legend" style={{display: "inline-block", background: "#3c88d1", borderRadius: "3px", paddingRight: "5px", paddingLeft: "15px", paddingTop: "5px", paddingBottom: "15px", position: "absolute", top: "100px", left: "250px"}}>
          <h5>Chart Legend</h5>
          {this.renderLegend()}
        </ul>
      </div>
    )
  }


});
