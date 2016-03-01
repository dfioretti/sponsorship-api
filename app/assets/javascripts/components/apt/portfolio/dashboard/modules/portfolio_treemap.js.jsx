var PortfolioTreemap = React.createClass({
  mixins: [
    RepScoreMixin,
    ChartTooltipHandler
  ],
  getInitialState: function () {
    return {};
  },
  componentDidUpdate: function () {
    if (!this.state.chart) return;
    this.state.chart.update();
  },
  componentWillReceiveProps: function (newProps) {
    if (this.state.chart) this.state.chart.destroy();

    // Force component to render again once display:none is gone.
    if (this.props.hidden !== newProps.hidden) {
      this.setState({ reload: true});
    } else {
      this.buildChart(newProps);
    }
  },
  getLabels: function (props, data) {
    // assume daily cadence for now, need to refactor for multiple cadences
    return _.map(data, function (entry) {
      var label;

      if (props.cadence === "monthly") {
        label = moment(entry.date).format('MMMM');
      } else {
        label = moment(entry.date).format('MMM D');
      }

      return label;
    });
  },
  buildChart: function (props) {
    var repScores = props.repScores;
    if (!repScores) return;

    var news = [],
        social = [];

    $.each(repScores.raw, function(i, point) {
      news.push(point.news_score ? point.news_score.toFixed(1) : null);
      social.push(point.social_score ? point.social_score.toFixed(1) : null);
    }.bind(this));

    this.renderChart(news, social, repScores, this.getLabels(props, repScores.raw), props);
  },
  renderLegend: function () {
    if (!this.state.data) return;

    return _.map(this.state.data.datasets, function (dataset, i) {
      return(
        <div key={i} className="company-legend">
          <span className="legend-color" style={{backgroundColor: dataset.pointStrokeColor}}></span><span>{dataset.label} ({dataset.averageSentimentScore.toFixed(1)})</span>
        </div>
      );
    });
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
