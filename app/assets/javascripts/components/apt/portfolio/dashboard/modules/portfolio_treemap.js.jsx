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
    var colors = ["#3c88d1", "#e76959", "#f5a623", "#124c93", "#50e3c2", "#03387a", "#738694"];
    // TODO: http://www.highcharts.com/demo/treemap-large-dataset
    // levels

    $('#tree-map').highcharts({
        chart: {
          style: {
              fontFamily:'Avenir-Book'
          },
          height: 270,
          spacing: [0, 0, 0, 0],
          backgroundColor: "#2d64a5",
          borderColor: "#2d64a5",
        },
        series: [{
            borderColor: "#2d64a5",
            type: "treemap",
            layoutAlgorithm: 'squarified',
            data: [{
                name: 'Sports',
                value: 6,
                color: colors[0]
            }, {
                name: 'Ent',
                value: 6,
                color: colors[1]
            }, {
                name: 'MLB',
                value: 4,
                color: colors[2]
            }, {
                name: 'NASCAR',
                value: 3,
                color: colors[3]
            }, {
                name: 'NFL',
                value: 2,
                color: colors[4]
            }, {
                name: 'Music',
                value: 2,
                color: colors[5]
            }, {
                name: 'NHL',
                value: 1,
                color: colors[6]
            }]
        }],
        title: {
            text: null//'Portfolio Allocation',
            //margin: 2
        }
    });
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="global_hotspots" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <a className="expand-handle"></a>
          <div className="drag-handle"></div>
          <div className="top-title">Portfolio Allocation</div>
        </div>
        <div className="main">
          <div style={{paddingTop: "0px"}}id="tree-map">
            {this.renderChart()}
          </div>
        </div>
      </div>
    );
  }
});
