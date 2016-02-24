var SocialStats = React.createClass({
  getInitialState: function() {
    return {socialStats: {}};
  },
  /*
   * This is all hacky as fuck
   * but i'm not building a real API
   * until we have a data model
   */
  componentDidMount: function() {
    $(this.refs.flipper).flip();
    this.loadData();
  },
  componentWillReceiveProps: function() {
    this.loadData();
  },
  loadData: function() {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/api/v1/apt/asset/mock_data",
      data: {"type":"social", "id": this.props.asset.id},
      success: function(data, status, xhr) {
        this.setState({socialStats: data.stats});
        this.renderChart(data.stats);
      }.bind(this),
      error: function(xhr, status, error) {
        console.log("ERROR");
        console.log(status);
        console.log(error);
      }
    });
  },
  renderChart: function(stats) {
    var barData = {
      labels : ["January","February","March","April","May","June"],
      datasets : [
        {
          label: "My First dataset",
          fillColor: "rgba(80,227,194,1)",
          strokeColor: "rgba(80,227,194,1)",
          data : [456,479,324,569,702,600]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(245,166,35,1)",
          strokeColor: "rgba(245,166,35,1)",
          data : [364,504,605,400,345,320]
        }

      ]
    }
    var socialChart = document.getElementById("social-chart").getContext("2d");
    new Chart(socialChart).Bar(barData, {
      animation: true,
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
      scaleFontSize: 11,
      scaleShowVerticalLines: false,
      scaleLabel: "<%= ' ' + value%>"
    });
  },
  render: function() {
    var stats = this.state.socialStats;
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    var asset = this.props.asset;

    return (
      <div id="social_stats" className="dashboard-module" ref="flipper" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Socal Stats</div>
        </div>
        <div className="front">
          <div className="main social-stats-list">
            <ul>
              <li>
                <div className="stat-image">
                  <img src="https://logo.clearbit.com/www.twitter.com"/>
                </div>
                <div className="stat-header">Twitter Followers</div>
                <div className="stat-metric">{stats.twitter}</div>
              </li>
              <li>
                <div className="stat-image">
                  <img src="https://logo.clearbit.com/www.plus.google.com" />
                </div>
                <div className="stat-header">Google+ Followers</div>
                <div className="stat-metric">{stats.google}</div>
              </li>
              <li>
                <div className="stat-image">
                  <img src="https://logo.clearbit.com/www.facebook.com" />
                </div>
                <div className="stat-header">Facebook Fans</div>
                <div className="stat-metric">{stats.facebook}</div>
              </li>
              <li>
                <div className="stat-image">
                  <img src="https://logo.clearbit.com/www.klout.com" />
                </div>
                <div className="stat-header">Klout Score</div>
                <div className="stat-metric">{stats.klout}</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="back chart-wrapper">
          <div className="main chart-wrapper">
            <canvas width="380px" height="240px" id="social-chart"></canvas>
          </div>
        </div>
      </div>
    );
  }
});
