var PortfolioTreemap = React.createClass({
  mixins: [
    RepScoreMixin,
    ChartTooltipHandler
  ],
  getInitialState: function () {
    return {};
  },
  componentDidMount: function() {
    this.renderChart();
  },
  buildChart: function (props) {
    this.renderChart();
  },
  renderChart: function () {
    $('#tree-map').highcharts({
        chart: {
          height: 230,
        },
        series: [{
            type: "treemap",
            data: [{
                name: 'Sports',
                value: 6
            }, {
                name: 'Ent',
                value: 6
            }, {
                name: 'MLB',
                value: 4
            }, {
                name: 'NFL',
                value: 3
            }, {
                name: 'NASCAR',
                value: 2
            }, {
                name: 'Music',
                value: 2
            }, {
                name: 'NHL',
                value: 1
            }]
        }],
        title: {
            text: 'Portfolio Allocation',
            margin: 2
        }
    });
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="teneo_rep_score" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <a className="expand-handle"></a>
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.title}</div>
        </div>
        <div className="main">
          <div id="tree-map">
            {this.renderChart()}
          </div>
        </div>
      </div>
    );
  }
});
