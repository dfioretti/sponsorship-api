var RepScore = React.createClass({
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
          news.push((point.news_score || 0).toFixed(2));
          social.push((point.social_score || 0).toFixed(2));
        }.bind(this));

        this.renderChart(news, social, this.getLabels(data));
      }.bind(this)
    );
  },
  getLabels: function (data) {
    // assume daily cadence for now, need to refactor for multiple cadences
    return _.map(data, function (entry) {
      return moment(entry.date).format('MMM D');
    });
  },
  renderChart: function(news, social, labels) {
    if (this.sentimentChart) this.sentimentChart.destroy();

    var ctx = $("#rep-score-chart").get(0).getContext("2d");

    var data = {
      labels: labels,
      datasets: [
        {
          label: 'News Score',
          fillColor: "rgba(0,0,0,0)",
          strokeColor: "rgba(80,227,194,1)",
          pointColor: "rgba(80,227,194,1)",
          pointStrokeColor: "rgba(80,227,194,1)",
          pointHighlightFill: "rgba(80,227,194,1)",
          pointHighlightStroke: "rgba(80,227,194,1)",
          data: news
        },
        {
          label: 'Social Score',
          fillColor: "rgba(0,0,0,0)",
          strokeColor: "rgba(245,166,35,1)",
          pointColor: "rgba(245,166,35,1)",
          pointStrokeColor: "rgba(245,166,35,1)",
          pointHighlightFill: "rgba(245,166,35,1)",
          pointHighlightStroke: "rgba(245,166,35,1)",
          data: social
        }
      ]
    };

    console.log(data)
    // Chart.defaults.global.elements.line.tension = 0;

    // var data = {
    //   type: 'line',
    //   data: {
    //     labels: new Array(news.length).fill(''),
    //     datasets: [{
    //       yAxisID: "y-axis-1",
    //       label: 'News Score',
    //       fill: false,
    //       borderColor: "rgba(80,227,194,1)",
    //       borderWidth: 1,
    //       pointBorderColor: "rgba(80,227,194,1)",
    //       pointHoverRadius: 5,
    //       pointBackgroundColor: "rgba(255,255,255,1)",
    //       data: news
    //     },
    //     {
    //       yAxisID: "y-axis-2",
    //       label: 'Social Score',
    //       fill: false,
    //       borderColor: "rgba(245,166,35,1)",
    //       borderWidth: 1,
    //       pointBorderColor: "rgba(245,166,35,1)",
    //       pointHoverRadius: 5,
    //       pointBackgroundColor: "rgba(255,255,255,1)",
    //       data: social
    //     }]
    //   },
    //   options:{
    //     responsive: true,
    //     hover: {
    //       mode: "label"
    //     },
    //     tooltips: {
    //       enabled: true,
    //       mode: "label",
    //       bodyFontFamily: "Avenir-Book",
    //       bodyColor: "#9b9b9b",
    //       backgroundColor: "#fff",
    //       cornerRadius: 3,
    //       yPadding: 0,
    //       xPadding: 14,
    //       caretSize: 5
    //     },
    //     stacked: false,
    //     scales:{
    //       xAxes:[{
    //         gridLines: {
    //           drawTicks: false,
    //           color: "rgba(255, 255, 255, 0.0)"
    //         }
    //       }],
    //       yAxes:[{
    //         id: "y-axis-1",
    //         type: "linear",
    //         position: "left",
    //         ticks:{
    //           beginAtZero: true,
    //           fontColor: "rgba(255, 255, 255, 0.6)",
    //           fontFamily: "Avenir-Medium"
    //         },
    //         gridLines: {
    //           color: "rgba(255, 255, 255, 0.1)",
    //           zeroLineWidth: 1,
    //           zeroLineColor: "#2d64a5"
    //         }
    //       },
    //       {
    //         id: "y-axis-2",
    //         type: "linear",
    //         ticks:{
    //           beginAtZero: true
    //         },
    //         gridLines: {
    //           show: false
    //         },
    //         display: false
    //       }]
    //     }
    //   }
    // };

    this.sentimentChart = new Chart(ctx).Line(data, {
      tooltipFontSize: 9,
      tooltipFillColor: 'rgba(255,255,255,0.8)',
      tooltipFontStyle: 'Avenir-Book',
      tooltipFontColor: '#333',
      tooltipTitleFontColor: '#333',
      scaleFontColor: "#fff",
      scaleLineColor: "rgba(255,255,255,0.3)",
      scaleGridLineColor: "rga(255,255,255,0.3)",
      scaleLabel: "<%= ' ' + value%>"
    });

    this.setState({chart: this.sentimentChart});
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="teneo_rep_score" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <a className="expand-handle"></a>
          <div className="drag-handle"></div>
          <div className="top-title">Rep Score</div>
        </div>
        <div className="main">
          <canvas id="rep-score-chart" width="380px" height="240px"></canvas>
        </div>
      </div>
    );
  }
});
