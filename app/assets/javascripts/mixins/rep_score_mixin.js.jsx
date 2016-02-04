var RepScoreMixin = {
  getTrendIconClass: function () {
    var trendCN = "trend-image ";

    trendCN += this.getTrendClass();

    return trendCN;
  },
  getTrendClass: function () {
    var className;
    var trend = this.props.repScores.avgTrend;

    if (trend > 0) {
      className = "up";
    } else if (trend < 0) {
      className = "down";
    } else {
      className = "no-change";
    }

    return className;
  }
};