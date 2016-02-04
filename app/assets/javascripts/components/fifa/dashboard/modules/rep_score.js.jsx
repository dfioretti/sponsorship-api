var RepScore = React.createClass({
  getInitialState: function () {
    return {};
  },
  componentDidMount: function() {
    this.getData();
  },
  componentWillReceiveProps: function (newProps) {
    this.getData(newProps);
  },
  getData: function(props) {
    var p = props ? props : this.props;

    Dispatcher.fifaGet(
      FIFAEndpoints.REP_SCORE,
      {
        start_date: moment(p.startDate).format('YYYY-MM-DD'),
        end_date: moment(p.endDate).format('YYYY-MM-DD')
      },
      function(data) {
        var news = [],
        social = [];
        data = _.sortBy(data, 'date');

        $.each(data, function(i, point) {
          news.push(point.news_score ? point.news_score.toFixed(2) : null);
          social.push(point.social_score ? point.social_score.toFixed(2) : null);
        }.bind(this));

        this.setState({ rawData: data }, function () {
          this.renderChart(news, social, this.getLabels(data));
        });
      }.bind(this)
    );
  },
  getLabels: function (data) {
    // assume daily cadence for now, need to refactor for multiple cadences
    return _.map(data, function (entry) {
      return moment(entry.date).format('MMM D');
    });
  },
  getTrendIconClass: function () {
    var trendCN = "trend-image ";
    var average = 2.1;

    if (average > 0) {
      trendCN += "up";
    } else if (average < 0) {
      trendCN += "down";
    } else {
      trendCN += "no-change";
    }

    return trendCN;
  },
  renderLegend: function () {
    if (!this.state.data) return;

    return _.map(this.state.data.datasets, function (dataset, i) {
      return(
        <div key={i} className="company-legend">
          <span className="legend-color" style={{backgroundColor: dataset.pointStrokeColor}}></span><span>{dataset.label}</span>
        </div>
      );
    });
  },
  renderChart: function(news, social, labels) {
    if (this.sentimentChart) this.sentimentChart.destroy();

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
          data: news
        },
        {
          label: 'Social',
          fillColor: "rgba(0,0,0,0)",
          strokeColor: "rgba(245,166,35,1)",
          pointColor: "#fff",
          pointStrokeColor: "rgba(245,166,35,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(245,166,35,1)",
          data: social
        }
      ]
    };

    this.sentimentChart = new Chart(ctx).Line(data, {
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
      scaleSteps : 5,
      scaleStepWidth : 1,
      scaleStartValue : 0,
      customTooltips: function (tooltip) {


        var tooltipEl = $('#chartjs-tooltip');
         if (!tooltip) {
             tooltipEl.css({
                 opacity: 0
             });
             return;
         }

         var labels = ["News", "Social"];
         var dateOfToolTip = self.state.rawData[self.getLabels(self.state.rawData).indexOf(tooltip.title)].date;
         tooltipEl.removeClass('above below');
         tooltipEl.addClass(tooltip.yAlign);
         var innerHtml = '';
         innerHtml+= '<h6>' + moment(dateOfToolTip).format('MMMM Do, YYYY')  + '</h6>';
         for (var i = tooltip.labels.length - 1; i >= 0; i--) {
          innerHtml += [
            '<div class="chartjs-tooltip-section">',
            ' <span class="chartjs-tooltip-key" style="background-color:' + tooltip.legendColors[i].fill + '"></span>',
            ' <span class="chartjs-tooltip-value">' + labels[i] + ': ' + tooltip.labels[i] + '</span>',
            '<div class="arrow-down"></div>',
            '</div>'
          ].join('');
         }
         tooltipEl.html(innerHtml);
         console.log(tooltip.x)
         tooltipEl.css({
             opacity: 1,
             left: (tooltip.x) + 'px',
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
          <div className="pull-right"><span className="">{2.7}</span><div className={this.getTrendIconClass()}></div></div>
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
