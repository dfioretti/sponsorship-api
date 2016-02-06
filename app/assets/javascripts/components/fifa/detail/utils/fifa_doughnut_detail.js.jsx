var FifaDoughnutDetail = React.createClass({
  componentWillMount: function () {
    this.chartId = uuid.v4();
  },
  componentDidUpdate: function () {
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
  renderChart: function (props) {
    if (!props.data) return;

    var data = this.props.data;

    data = _.map(data, function (dataset, i) {
      dataset.color = this.backgroundColor[i];
      return dataset;
    }.bind(this));

    var ctx = $("#" + this.chartId).get(0).getContext("2d");

    var doughnutChart = new Chart(ctx).Doughnut(data, {
      tooltipFontSize: 9,
      tooltipFillColor: 'rgba(255,255,255,0.8)',
      tooltipFontStyle: 'Avenir-Medium',
      tooltipFontColor: '#333',
      animationEasing : "easeOutQuart",
      animateRotate: false,
      animateScale: true,
      animationSteps: 30
    });

  },
  renderLegend: function () {
    var data = this.props.data;

    return _.map(data, function (pt, i) {
      var backgroundColor = this.backgroundColor[i];

      return(
        <li key={backgroundColor}>
          <span className="legend-droplet" style={{ borderColor: backgroundColor}}></span>
          <span>{pt.label}</span>
        </li>
      );
    }.bind(this));
  },
  render: function () {
    return(
      <div className="detail-module detail-chart">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.moduleTitle}</div>
        </div>
        <div className="main">
          <div className="doughnut-main-container">
            <div className="doughnut-chart-container">
              <canvas id={this.chartId} width="201" height="201" style={{width: "201px", height: "201px"}}></canvas>
            </div>
            <ul className="doughnut-chart-legend">
              {this.renderLegend()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});