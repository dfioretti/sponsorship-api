var DetailChart = React.createClass({
  getInitialState: function() {
    return {graphId: uuid.v4()}
  },
  componentDidMount: function() {
    var chart = new Chartist.Line('.ct-chart-'+this.state.graphId, {
      series: [{
        name: 'main',
        data: [
          { x: new Date(2012, 01, 1), y: 26},
          { x: new Date(2012, 02, 3), y: 38},
          { x: new Date(2012, 03, 5), y: 43},
          { x: new Date(2012, 04, 7), y: 29},
          { x: new Date(2012, 05, 11), y: 41},
          { x: new Date(2012, 06, 13), y: 54},
          { x: new Date(2012, 07, 20), y: 66},
          { x: new Date(2013, 03, 21), y: 60},
          { x: new Date(2014, 02, 25), y: 53},
          { x: new Date(2014, 15, 27), y: 60}
        ]
      },
      {
        name: 'second',
        data: [
          { x: new Date(2011, 01, 1), y: 50},
          { x: new Date(2011, 02, 3), y: 23},
          { x: new Date(2011, 03, 5), y: 12},
          { x: new Date(2011, 04, 7), y: 20},
          { x: new Date(2011, 05, 11), y: 33},
          { x: new Date(2011, 06, 13), y: 26},
          { x: new Date(2011, 07, 20), y: 43},
          { x: new Date(2012, 03, 21), y: 31},
          { x: new Date(2013, 02, 25), y: 23},
          { x: new Date(2013, 15, 27), y: 26}
        ]
      }]
    }, {
      axisX: {
        type: Chartist.FixedScaleAxis,
        divisor: 8,
        labelInterpolationFnc: function(value) {
          return moment(value).format('MMM YYYY');
        }
      },
      axisY: {
        onlyInteger: true,
        high: 80,
        low: 0
      },
      showPoint: false,
      lineSmooth: false,
      fullWidth: true,
      chartPadding: 0
    });
  },
  renderLegend: function() {
    return (
      <div className="chart-legend">
        <div className="company-legend"><span className="legend-color"></span>{this.props.company.name}</div>
        <div className="other-legend"><span className="legend-color"></span>Industry Average</div>
      </div>
    );
  },
  render: function() {
    var cn = "graph ct-chart-" + this.state.graphId;
    return (
      <div id="" className="detail-module detail-chart">
        <div className="top">
          <div className="filters">
            <div className="filter average-filter">Comps Average <span className="caret"></span></div>
            <div className="filter comp-filter">Comps <span className="caret"></span></div>
          </div>
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.data.title}</div>
        </div>
        <div className="main">
          {this.renderLegend()}
          <div id={this.state.graphId} className={cn}></div>
        </div>
      </div>
    );
  }
});
