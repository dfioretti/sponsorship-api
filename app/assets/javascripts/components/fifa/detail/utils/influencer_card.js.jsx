var InfluencerCard = React.createClass({
  mixins: [jScrollpaneMixin],
  getInitialState: function () {
    return {};
  },
  componentDidMount: function () {
    this.setNewsContainerHeight();
  },
  setNewsContainerHeight: function () {
    var remainingHeight = $(this.refs.main).height() - $(this.refs.influencerCardMainContainer).outerHeight();

    this.setState({newsContainerHeight: remainingHeight + 'px'});
  },
  renderIssueTags: function () {
    var topics = _.get(this.props.item, 'issue_tags.subtopics');
    return _.map(topics, function (topic, i) {
      return (<li key={i}>{topic.subtopic}</li>);
    });
  },
  renderNews: function () {
    return _.map(this.props.item.top_news, function (newsItem, i) {
      var textSnippet;

      if (newsItem.full_text) {
        textSnippet = (<p className="news-text-snippet">{newsItem.full_text}</p>);
      }

      return (
        <li key={i}>
          <a href={newsItem.link} target="_blank">
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
          <div className="pull-right twitter-handle"><a href={this.props.item.profile} target="_blank">{'@' + this.props.item.handle}</a></div>
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.item.name}</div>
        </div>
        <div className="main" ref="main">
          <div ref="influencerCardMainContainer">
            <div className="header-container">
              <div className="media-image"><img src={this.props.item.profile_img}/></div>
              <div className="media-text">
                <p>{this.props.item.bio}</p>
                <ul className="detail-influencer-card-tags">
                  {this.renderIssueTags()}
                  <li>Add Tag</li>
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
          </div>
          <ul className="news-container" onScroll={this.toggleScrollActive} style={{height: this.state.newsContainerHeight}} >
            {this.renderNews()}
          </ul>
        </div>
      </div>
    );
  }
});