var DateRangeMixin = {
  defaultStartInverval: 35,
  defaultStartDate: moment().subtract(this.defaultStartInverval, 'days').toDate(),
  getInitialDateRange: function (selectedRange) {
    var daysAgo = selectedRange || this.defaultStartInverval;
    var endDate = moment(new Date()).add(1, 'days').toDate();
    var startDate = moment(endDate).subtract( daysAgo, 'days').toDate();

    return {
      endDate: endDate,
      startDate: startDate
    };
  },
  getDateRangeCadence: function (numberOfDays) {
    var cadence = 'daily';

    if (numberOfDays > 60) {
      cadence = 'monthly';
    } else if (numberOfDays > 21) {
      cadence = 'weekly';
    }

    return cadence;
  },
  onDateRangeSelect: function (startDate, endDate) {
    var numberOfDays = moment.duration(endDate.diff(startDate)).asDays();
    var cadence = this.getDateRangeCadence(numberOfDays);
    var config = {
      startDate: startDate,
      endDate: moment(endDate).add(1, 'days').toDate(),
      cadence: cadence
    };

    this.getRepScores(config).then(function (repScores) {
      this.setState(_.extend(config, repScores));
    }.bind(this));
  },
  getRepScores: function (newState) {
    var params = {
      start_date: moment(newState.startDate).format('YYYY-MM-DD'),
      end_date: moment(newState.endDate).format('YYYY-MM-DD'),
      cadence: newState.cadence
    };

    return RepScoresStore.list(params).then(function (data) {
      var socialAvg, newsAvg, overallAvg, avgTrend;
      data = _.sortBy(data, 'date');

      socialAvg = RepScoresStore.getRepScoreAvg('social_score', data);
      newsAvg = RepScoresStore.getRepScoreAvg('news_score', data);
      overallAvg = (socialAvg + newsAvg) / 2;
      avgTrend = RepScoresStore.getAvgTrend(data);

      return {
        repScores: {
          raw: data,
          socialAvg: socialAvg,
          newsAvg: newsAvg,
          overallAvg: overallAvg,
          avgTrend: avgTrend
        }
      };
    }.bind(this));
  }
};