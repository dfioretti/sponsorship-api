'use strict';
/**
 * react-bootstrap-daterangepicker.js
 *
 * A slightly modified version of bootstrap-daterangepicker.js for use in react and npm.
 * Original copyright in: ./node_modules/bootstrap-daterangepicker/
 */

/* this is our export React class */
var DateRangePicker = React.createClass({
  $picker: null,
  options: [
    "<input>",
    "applyClass",
    "autoApply",
    "autoUpdateInput",
    "buttonClasses",
    "cancelClass",
    "dateLimit",
    "drops",
    "endDate",
    "isInvalidDate",
    "linkedCalendars",
    "locale",
    "maxDate",
    "minDate",
    "opens",
    "parentEl",
    "ranges",
    "showDropdowns",
    "showWeekNumbers",
    "singleDatePicker",
    "startDate",
    "template",
    "timePicker",
    "timePicker24Hour",
    "timePickerIncrement",
    "timePickerSeconds",
    "timeZone"
  ],
  makeEventHandler: function (eventType) {
    return function (event, picker) {
      if (typeof this.props.onEvent === 'function') {
        this.props.onEvent(event, picker);
      }
      if (typeof this.props[eventType] === 'function') {
        this.props[eventType](event, picker);
      }
    }.bind(this);
  },
  getOptionsFromProps: function () {
    var options, props = this.props;
    this.options.forEach(function (option) {
      if (props.hasOwnProperty(option)) {
        options = options || {};
        options[option] = props[option];
      }
    });
    return options || {};
  },
  setOptionsFromProps: function () {
    var currentOptions = this.getOptionsFromProps();
    var keys = Object.keys(currentOptions);
    var $this = this;
    if ($this.$picker) {
      if (currentOptions) {
        keys.forEach(function (key) {
          $this.$picker.data('daterangepicker')[key] = currentOptions[key];
        });
      }
    }
  },
  componentDidMount: function () {
    this.initializeDateRangePicker();
  },
  componentWillUnmount: function () {
    this.removeDateRangePicker();
  },
  removeDateRangePicker: function() {
    this.$picker.data('daterangepicker').remove();
  },
  initializeDateRangePicker: function() {
    var $this = this;
    $ = (window.jQuery && window.jQuery.fn.daterangepicker)? window.jQuery : $;
    $this.$picker = $(this.refs.picker);
    // initialize
    $this.$picker.daterangepicker(this.getOptionsFromProps());
    // attach event listeners
    ['Show', 'Hide', 'ShowCalendar', 'HideCalendar', 'Apply', 'Cancel'].forEach(function (event) {
      var lcase = event.toLowerCase();
      $this.$picker.on(lcase + '.daterangepicker', $this.makeEventHandler('on' + event));
    });
  },
  render: function () {
    if (this.$picker) {
      this.removeDateRangePicker();
      this.initializeDateRangePicker();
    }

    this.setOptionsFromProps();
    return React.createElement(
      'div',
      React.__spread({ref: 'picker'},  this.props),
      this.props.children
    );
  }
});