var _GlobalIssuesStore = function (argument) {
  this.list = function (params) {
    p = $.Deferred();
    var self = this;

    Dispatcher.fifaGet(
      FIFAEndpoints.GLOBAL_ISSUES,
      (params || {}),
      function(data) {
        p.resolve(data);
      }
    );

    return p;
  };

  // Aggregate by issue averaging sentiment scores across the period by volume
  // Determine Cadence in this.List() params
  this.aggIssuesByWeightedAvgSentiment = function (issueType, data) {
    var aggIssues = {};

    // Aggregate scores by issue
    _.each(data, function (entry) {
      _.each(entry[issueType], function (issue, key) {
        var parentTopic = issue.parent_topic;
        if (!parentTopic) return;

        if (aggIssues[parentTopic]) {
          aggIssues[parentTopic].push(issue);
        } else {
          aggIssues[parentTopic] = [issue];
        }
      });
    });

    // Calculate the weighted average over the period
    var issuesWithAvgSentiment = [];

    _.each(aggIssues, function (issues, key) {
      var totalVolume = _.sumBy(issues, function (issue) { return issue.volume; });
      var totalWeightedSentiment = _.sumBy(issues, function (issue) { return issue.volume * issue.sentiment; });

      // Generate a linear regression
      var data = _.map(issues, function (issue, index) {
        return [index, issue.sentiment];
      });
      var trend = regression('linear', data);

      issuesWithAvgSentiment.push({
        title: key,
        volume: totalVolume,
        sentiment: totalWeightedSentiment / totalVolume,
        trend: data.length > 1 ? trend.equation[0] : 1 // the slope of the linear equation
      });
    });

    // Sort by volume
    issuesWithAvgSentiment = _.sortBy(issuesWithAvgSentiment, function (issue) {
      return issue.volume;
    }).reverse();

    return issuesWithAvgSentiment;
  };

  this.aggParentIssuesByVolume = function (issueType, data) {
    var issues = {};

    _.each(data, function (entry) {
      _.each(entry[issueType], function (issue, key) {
        var parentTopic = issue.parent_topic;

        if (parentTopic) {
          if (!issues[parentTopic]) {
            issues[parentTopic] = 0;
          }

          issues[parentTopic] += issue.volume;
         }
      });
    });

    return issues;
  };
};


window.GlobalIssuesStore = new _GlobalIssuesStore();