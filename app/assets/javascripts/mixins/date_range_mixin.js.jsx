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
  }
};