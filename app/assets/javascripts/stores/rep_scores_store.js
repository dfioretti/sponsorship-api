var RepScoresStore = function (argument) {
  this.list = function (params) {
    var p = $.Deferred();
    var self = this;

    Dispatcher.fifaGet(
      FIFAEndpoints.REP_SCORE,
      (params || {}),
      function(data) {
        p.resolve(data);
      }
    );

    return p;
  };

  this.getRepScoreAvg = function (type, data) {
    var values = _.compact(_.map(data, function (entry) { return entry[type]; }));

    return _.sum(values) / values.length;
  };

  this.getTrend = function (type, data) {
    var pts = _.compact(_.map(data, function (entry, index) {
      if (entry[type]) {
        return  [index, entry[type]];
      }
    }));

    var trend = regression('linear', pts);
    return pts.length > 1 ? parseFloat(trend.equation[0]) : 0;
  };

  this.getAvgTrend = function (data) {
    var trendSlopes = _.map(['social_score', 'news_score'], function (type) {
      return this.getTrend(type, data);
    }.bind(this));

    return _.sum(trendSlopes) / trendSlopes.length;
  };
};


window.RepScoresStore = new RepScoresStore();