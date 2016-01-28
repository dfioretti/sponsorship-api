var InfluencerCard = React.createClass({
  render: function () {
    return(
      <div id="" className="detail-module detail-module-3-col detail-chart">
        <div className="top">
          <div className="pull-right twitter-handle">{'@' + this.props.item.handle}</div>
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.item.name}</div>
        </div>
        <div className="main">
          <div className="media-image"><img src={this.props.item.profile_img}/></div>
          <div className="media-text">
            <div>{this.props.item.bio}</div>
          </div>
        </div>
        <ul className="twitter-stats">
          <li>
            <div className="metric">{this.props.item.following}</div>
            <div className="metric-label">Following</div>
          </li>
          <li>
            <div className="metric">{this.props.item.followers}</div>
            <div className="metric-label">Followers</div>
          </li>
          <li>
            <div className="metric">{this.props.item.followers}</div>
            <div className="metric-label">Followers</div>
          </li>
        </ul>
      </div>
    );
  }
});