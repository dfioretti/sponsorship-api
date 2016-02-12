var _GlobalIssuesStore = function (argument) {
  this.list = function (params) {
    var p = $.Deferred();
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

  this.aggTopics = function (aggIssues, entries, topicKey) {
    // Aggregate scores by issue
    _.each(entries, function (issue, key) {
      if (!issue.topic) issue.topic = key;

      var topicName = issue[topicKey];
      if (!topicName) return;

      if (aggIssues[topicName]) {
        aggIssues[topicName].push(issue);
      } else {
        aggIssues[topicName] = [issue];
      }
    });

    return aggIssues;
  };

  // Aggregate subtopics in list ordered by volume
  this.orderedSubtopics = function (entries) {
    var aggIssues = {};
    var topicKey = "topic";
    var orderedSubtopics = [];
    this.aggTopics(aggIssues, entries, topicKey);

    _.each(aggIssues, function (entries, key) {
      var totalVolume = _.sumBy(entries, function (entry) { return entry.volume; });
      var totalWeightedSentiment = _.sumBy(entries, function (entry) { return entry.volume * entry.sentiment; });

      orderedSubtopics.push({
        title: key,
        sentiment: totalWeightedSentiment / totalVolume
      });
    });

    orderedSubtopics = _.sortBy(orderedSubtopics, function (subTopic) {
      return subTopic.volume;
    }).reverse();

    return orderedSubtopics;
  };

  // Aggregate by issue averaging sentiment scores across the period by volume
  // Determine Cadence in this.List() params
  this.aggIssuesByWeightedAvgSentiment = function (issueType, data) {
    var aggIssues = {};
    var topicKey = "parent_topic";

    _.each(data, function (entry) {
      this.aggTopics(aggIssues, entry[issueType], topicKey);
    }.bind(this));

    // Calculate the weighted average over the period
    var issuesWithAvgSentiment = [];

    _.each(aggIssues, function (issues, key) {
      var totalVolume = _.sumBy(issues, function (issue) {
        return issue.volume;
      });
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
        trend: data.length > 1 ? trend.equation[0] : 0, // the slope of the linear equation
        subTopics: this.orderedSubtopics(issues)
      });
    }.bind(this));

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
    // Sort by date. temporary fix
    data = _.sortBy(data, 'date');

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
        title: issue.title,
        points: _.map(data, function (entry) {
          var volume = 0;

          _.each(entry[issueType], function (_issue) {
            var parentTopic = _issue.parent_topic;

            if (parentTopic === issue.title) {
              volume += _issue.volume;
            }
          });

          return {
            date: moment(entry.date),
            volume: volume
          };
        })
      };
    });
  };
};


window.GlobalIssuesStore = new _GlobalIssuesStore();