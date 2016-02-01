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

      // Generate a linear regression from the cadence points
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

  this.getIssuesByVolumeWithCadence = function (issueType, data) {
    var issuesWithVolume = [];
    var orderedIssuesByVolume;

    _.each(this.aggParentIssuesByVolume(issueType, data), function (volume, key) {
      issuesWithVolume.push({
        title: key,
        volume: volume
      });
    }.bind(this));

    orderedIssuesByVolume = _.sortBy(issuesWithVolume, function (issue) {
      return issue.volume;
    }.bind(this)).reverse();


    return _.map(orderedIssuesByVolume, function (issue) {
      return {
        title: issue,
        points: _.map(data, function (entry) {
          var volume = 0;

          _.each(entry[issueType], function (_issue) {
            var parentTopic = _issue.parent_topic;

            if (parentTopic === issue.title) {
              volume = _issue.volume;
            }
          });

          return volume;
        })
      };
    });
  };
};


window.GlobalIssuesStore = new _GlobalIssuesStore();