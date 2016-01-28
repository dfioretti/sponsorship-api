var FifaDoughnutDetail = React.createClass({
  componentDidMount: function () {
    this.renderChart(this.props);
  },
  componentDidUpdate: function (newProps) {
    this.renderChart(newProps);
  },
  renderChart: function (props) {
    var ctx = $("#myChart").get(0).getContext("2d");
    var myNewChart = new Chart(ctx, {
      type: 'doughnut',
      data: this.props.data
    })

    console.log()
  },
  renderLegend: function () {
    var data = this.props.data;

    var self= this;
    console.log(data)
    console.log(data.labels)
    return _.map(data.labels, function (label, i) {
      var backgroundColor = data.datasets[0].backgroundColor[i]

      return(
        <li key={backgroundColor}>
          <span className="legend-droplet" style={{ 'border-color': backgroundColor}}></span>
          <span>{label}</span>
        </li>
      );
    })
  },
  render: function () {
    return (
      <div className="detail-module detail-chart">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.moduleTitle}</div>
        </div>
        <div className="main">
          <div className="doughnut-main-container">
            <div className="doughnut-chart-container">
              <canvas id="myChart" width="201" height="201" style={{width: "201px", height: "201px"}}></canvas>
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