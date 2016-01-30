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
  render: function () {
    return(
      <li key={this.props.item.title}>
        <div className="trend-score">{this.props.item.sentiment.toFixed(2)}</div>
        <div className={this.getTrendIconClass()}></div>
        <div className="trend-text">
          <div className="trend-header">{this.props.item.title}</div>
          <div className="trend-subheader">{this.props.item.volume + ' items'}</div>
        </div>
      </li>
    )
  }
});