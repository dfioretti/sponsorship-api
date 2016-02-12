var GlobalIssuesItem = React.createClass({
  getTrendIconClass: function () {
    var trendCN = "trend-image ";
    if (this.props.item.trend > 0) {
      trendCN += "up";
    } else if (this.props.item.trend < 0) {
      trendCN += "down";
    } else {
      trendCN += "no-change";
    }

    return trendCN;
  },
  renderSubtopics: function () {
    if (!this.props.showSubTopics || !this.props.item.subTopics.length) return;

    var subTopics = _.map(this.props.item.subTopics.splice(0,3), function (subTopic, i) {
      return(
        <li key={i} className="global-issues-subtopic">
          <div className="trend-score">{subTopic.sentiment.toFixed(2)}</div>
          <h6 className="global-issues-subtopic-title">{subTopic.title}</h6>
        </li>
      );
    });

    return(
      <ul className="global-issues-subtopics-container">
        {subTopics}
      </ul>
    );
  },
  render: function () {
    return(
      <li key={this.props.item.title}>
        <div className="trend-score">{this.props.item.sentiment.toFixed(2)}</div>
        <div className={this.getTrendIconClass()}></div>
        <div className="trend-text">
          <div className="trend-header">{this.props.item.title}</div>
          <div className="trend-subheader">{this.props.item.volume.toFixed(0) + ' items'}</div>
          {this.renderSubtopics()}
        </div>
      </li>
    )
  }
});