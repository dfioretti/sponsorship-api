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
    var aggIssues = {
      "Some issue": [
        {
          sentiment: 2.5,
          volume: 4
        }
      ]
    };

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
    })

    console.log(aggIssues)


    // Calculate the weighted average over the period
    // If we want, we want calculate trendline here too
    var issuesWithAvgSentiment = {};

    _.each(aggIssues, function (issues, key) {
      var totalVolume = _.sumBy(issues, function (issue) { return issue.volume; });
      var totalWeightedSentiment = _.sumBy(issues, function (issue) { return issue.volume * issue.sentiment; });

      issuesWithAvgSentiment[key] = {
        volume: totalVolume,
        sentiment: totalWeightedSentiment / totalVolume
      };
    });

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