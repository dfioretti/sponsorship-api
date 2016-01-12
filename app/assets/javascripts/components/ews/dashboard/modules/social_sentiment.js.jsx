var SocialSentiment = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    this.getData();
  },
  componentWillReceiveProps: function(newProps) {
    if (this.props.company.id != newProps.company.id) {
      this.getData(newProps);
    }
  },
  getData: function(props) {
    var p = props ? props : this.props;

    Dispatcher.apiGet(
      APIEndpoints.SOCIAL_SENTIMENT,
      {id: p.company.api_id},
      function(data) {
        var sentiment = [],
        volume = [];
        $.each(data.reverse(), function(i, point) {
          sentiment.push(point.sentiment);
          volume.push(point.volume);
        }.bind(this));

        if (typeof(this.state.chart) != 'undefined') {
          $('#social_sentiment .main iframe').remove();
          $('#sentiment-chart').replaceWith('<canvas id="sentiment-chart"></canvas>');
        }

        this.renderChart(sentiment, volume);

      }.bind(this)
    );
  },
  renderChart: function(sentiment, volume) {
    var ctx = document.getElementById("sentiment-chart");
    Chart.defaults.global.elements.line.tension = 0;

    var data = {
      type: 'line',
      data: {
        labels: new Array(sentiment.length).fill(''),
        datasets: [{
          yAxisID: "y-axis-1",
          label: 'Sentiment',
          fill: false,
          borderColor: "rgba(80,227,194,1)",
          borderWidth: 1,
          pointBorderColor: "rgba(80,227,194,1)",
          pointHoverRadius: 5,
          pointBackgroundColor: "rgba(80,227,194,1)",
          data: sentiment
        },
        {
          yAxisID: "y-axis-2",
          label: 'Volume',
          fill: true,
          backgroundColor: "rgba(255,255,255,0.1)",
          borderColor: "rgba(255,255,255,1)",
          borderWidth: 1,
          pointBorderColor: "transparent",
          pointBackgroundColor: "transparent",
          data: volume
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
              color: "rgba(255, 255, 255, 0.1)"
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
    }

    var sentimentChart = new Chart(ctx, data);

    this.setState({chart: sentimentChart});
    window.test = sentimentChart;
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="social_sentiment" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Social Sentiment</div>
        </div>
        <div className="main">
          <canvas id="sentiment-chart"></canvas>
          <div>Social Sentiment : Social Volume</div>
        </div>
      </div>
    );
  }
});
