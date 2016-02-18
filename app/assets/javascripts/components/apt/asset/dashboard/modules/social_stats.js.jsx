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
        console.log("return data");
        console.log(data);
        this.setState({socialStats: data.stats});
      }.bind(this),
      error: function(xhr, status, error) {
        console.log("ERROR");
        console.log(status);
        console.log(error);
      }
    });
  },
  render: function() {
    console.log(this.state.socialStats);
    var stats = this.state.socialStats;
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    var asset = this.props.asset;

    return (
      <div id="social_stats" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Socal Stats</div>
        </div>
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
    );
  }
});

