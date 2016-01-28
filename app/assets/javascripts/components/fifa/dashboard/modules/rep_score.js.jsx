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
        $.each(data.reverse(), function(i, point) {
          news.push(point.news_score);
          social.push(point.social_score);
        }.bind(this));

        this.renderChart(news, social);
      }.bind(this)
    );
  },
  renderChart: function(news, social) {
    if (this.sentimentChart) this.sentimentChart.destroy();

    var ctx = document.getElementById("rep-score-chart");
    Chart.defaults.global.elements.line.tension = 0;

    var data = {
      type: 'line',
      data: {
        labels: new Array(news.length).fill(''),
        datasets: [{
          yAxisID: "y-axis-1",
          label: 'News Score',
          fill: false,
          borderColor: "rgba(80,227,194,1)",
          borderWidth: 1,
          pointBorderColor: "rgba(80,227,194,1)",
          pointHoverRadius: 5,
          pointBackgroundColor: "rgba(255,255,255,1)",
          data: news
        },
        {
          yAxisID: "y-axis-2",
          label: 'Social Score',
          fill: false,
          borderColor: "rgba(245,166,35,1)",
          borderWidth: 1,
          pointBorderColor: "rgba(245,166,35,1)",
          pointHoverRadius: 5,
          pointBackgroundColor: "rgba(255,255,255,1)",
          data: social
        }]
      },
      options:{
        responsive: true,
        hover: {
          mode: "label"
        },
        tooltips: {
          enabled: true,
          mode: "label",
          bodyFontFamily: "Avenir-Book",
          bodyColor: "#9b9b9b",
          backgroundColor: "#fff",
          cornerRadius: 3,
          yPadding: 0,
          xPadding: 14,
          caretSize: 5
        },
        stacked: false,
        scales:{
          xAxes:[{
            gridLines: {
              drawTicks: false,
              color: "rgba(255, 255, 255, 0.0)"
            }
          }],
          yAxes:[{
            id: "y-axis-1",
            type: "linear",
            position: "left",
            ticks:{
              beginAtZero: true,
              fontColor: "rgba(255, 255, 255, 0.6)",
              fontFamily: "Avenir-Medium"
            },
            gridLines: {
              color: "rgba(255, 255, 255, 0.1)",
              zeroLineWidth: 1,
              zeroLineColor: "#2d64a5"
            }
          },
          {
            id: "y-axis-2",
            type: "linear",
            ticks:{
              beginAtZero: true
            },
            gridLines: {
              show: false
            },
            display: false
          }]
        }
      }
    };

    this.sentimentChart = new Chart(ctx, data);

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
          <canvas id="rep-score-chart" height="180"></canvas>
        </div>
      </div>
    );
  }
});
