var RepScore = React.createClass({
  mixins: [RepScoreMixin],
  getInitialState: function () {
    return {};
  },
  componentDidUpdate: function () {
    if (!this.state.chart) return;
    console.log('state chart')
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
  getLabels: function (data) {
    // assume daily cadence for now, need to refactor for multiple cadences
    return _.map(data, function (entry) {
      return moment(entry.date).format('MMM D');
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

    this.renderChart(news, social, repScores, this.getLabels(repScores.raw));
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
  renderScore: function () {
    if (!this.props.repScores) return;
    return(<div className="pull-right overall-trend-score"><span className={this.getTrendClass()}>{this.props.repScores.overallAvg.toFixed(1)}</span><div className={this.getTrendIconClass()}></div></div>);
  },
  renderChart: function(news, social, repScores, labels) {
    console.log('reload chart')

    var ctx  = $("#rep-score-chart").get(0).getContext("2d");
    var self = this;

    var data = {
      labels: labels,
      datasets: [
        {
          label: 'News',
          fillColor: "rgba(0,0,0,0)",
          strokeColor: "rgba(80,227,194,1)",
          pointColor: "#fff",
          pointStrokeColor: "rgba(80,227,194,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(80,227,194,1)",
          data: news,
          averageSentimentScore: repScores.newsAvg
        },
        {
          label: 'Social',
          fillColor: "rgba(0,0,0,0)",
          strokeColor: "rgba(245,166,35,1)",
          pointColor: "#fff",
          pointStrokeColor: "rgba(245,166,35,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(245,166,35,1)",
          data: social,
          averageSentimentScore: repScores.socialAvg
        }
      ]
    };

    this.sentimentChart = new Chart(ctx).Line(data, {
      animation: false,
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
      scaleStepWidth : 1,
      scaleStartValue : 1,
      pointDotRadius : 3,
      customTooltips: function (tooltip) {
        var tooltipEl = $('#chartjs-tooltip');

         if (!tooltip) {
             tooltipEl.css({
                 opacity: 0
             });
             return;
         }

         var rawData = self.props.repScores.raw;
         var labels = ["News", "Social"];
         var dateOfToolTip = rawData[self.getLabels(rawData).indexOf(tooltip.title)].date;


         var innerHtml = '';
         innerHtml+= '<h6>' + moment(dateOfToolTip).format('MMMM Do, YYYY')  + '</h6>';
         for (var i = tooltip.labels.length - 1; i >= 0; i--) {
          innerHtml += [
            '<div class="chartjs-tooltip-section">',
            ' <span class="chartjs-tooltip-key" style="background-color:' + data.datasets[i].strokeColor + '"></span>',
            ' <span class="chartjs-tooltip-value">' + labels[i] + ': ' + tooltip.labels[i] + '</span>',
            '<div class="arrow-down"></div>',
            '</div>'
          ].join('');
         }
         tooltipEl.html(innerHtml);
         tooltipEl.css({
             opacity: 1,
             left: (tooltip.x - 65) + 'px',
             top: (tooltip.y - 72) + 'px',
             fontFamily: tooltip.fontFamily,
             fontSize: tooltip.fontSize,
             fontStyle: tooltip.fontStyle,
         });
      }
    });

    this.setState({
      data: data,
      chart: this.sentimentChart
    });
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="teneo_rep_score" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <a className="expand-handle"></a>
          {this.renderScore()}
          <div className="drag-handle"></div>
          <div className="top-title">Rep Score</div>
        </div>
        <div className="main">
          <div className="chart-legend">
            {this.renderLegend()}
          </div>
          <canvas id="rep-score-chart" width="380px" height="240px"></canvas>
          <div id="chartjs-tooltip"></div>
        </div>
      </div>
    );
  }
});
