var InfluencerCard = React.createClass({
  renderIssueTags: function () {

  },
  renderNews: function () {
    return _.map(this.props.item.top_news, function (newsItem, i) {
      var textSnippet;

      if (newsItem.full_text) {
        textSnippet = (<p className="news-text-snippet">{newsItem.full_text}</p>);
      }

      return (
        <li key={i}>
          <a href={newsItem.link}>
            <h5 className="news-title">{newsItem.title}</h5>
            <div className="news-subheader">via {newsItem.author} | {moment(newsItem.date).format('MMMM Do, YYYY')}</div>
            {textSnippet}
          </a>
        </li>
      );
    });
  },
  render: function () {
    return(
      <div className="detail-module detail-influencer-card detail-module-3-col">
        <div className="top">
          <div className="pull-right twitter-handle">{'@' + this.props.item.handle}</div>
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.item.name}</div>
        </div>
        <div className="main">
          <div className="header-container">
            <div className="media-image"><img src={this.props.item.profile_img}/></div>
            <div className="media-text">
              <p>{this.props.item.bio}</p>
              <ul className="detail-influencer-card-tags">
              </ul>
            </div>
          </div>
          <ul className="twitter-stats">
            <li>
              <div className="metric">{_.toShortenedNum(this.props.item.following)}</div>
              <div className="metric-label">Following</div>
            </li>
            <li>
              <div className="metric">{_.toShortenedNum(this.props.item.followers)}</div>
              <div className="metric-label">Followers</div>
            </li>
            <li>
              <div className="metric">{_.toShortenedNum(this.props.item.tweets)}</div>
              <div className="metric-label">Tweets</div>
            </li>
          </ul>
          <ul className="news-container">
            {this.renderNews()}
          </ul>
        </div>
      </div>
    );
  }
});