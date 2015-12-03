var SocialSentiment = React.createClass({
  componentDidMount: function() {
    var ctx = ReactDOM.findDOMNode(this.refs.chart);
    Chart.defaults.global.elements.line.tension = 0;

    var sentimentChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['', '', '', '', '', '', '', '', ''],
        datasets: [{
          yAxisID: "y-axis-1",
          label: 'Sentiment',
          fill: false,
          borderColor: "rgba(80,227,194,1)",
          borderWidth: 1,
          pointBorderColor: "rgba(80,227,194,1)",
          pointHoverRadius: 5,
          pointBackgroundColor: "rgba(80,227,194,1)",
          data: [
            1.1, 3.2, 2.3, 2.7, 3.4, 3.1, 3.2, 4.2, 1.9
          ]
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
          data: [
            1000, 1200, 2100, 3000, 2400, 2200, 4100, 4300, 3400
          ]
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
    });
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
          <canvas id="sentiment-chart" ref="chart"></canvas>
          <div>Social Sentiment : Social Volume</div>
        </div>
      </div>
    );
  }
});
