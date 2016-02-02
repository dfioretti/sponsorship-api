//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require lodash/dist/lodash.js
//= require jquery-deparam
//= require jquery.cookie
//= require jquery.shapeshift.min
//= require jquery.scrollstop.min
//= require jquery.mousewheel
//= require jscrollpane
//= require cartodb
//= require spin.min
//= require pubsub
//= require jtoker
//= require EventEmitter.min
//= require Immutable.min
//= require s3upload
//= require uuid
//= require moment.min
//= require chartjs/Chart
//= require chartist.min
//= require regression-js/src/regression.js

//= require bootstrap-sprockets
//= require turbolinks

//= require react
//= require react_ujs
//= require react_router
//= require react_router_ujs

//= require components

var pickHex = function(color1, color2, color3, ratio) {
  var newRatio;
  var hex = function(x) {
      x = x.toString(16);
      return (x.length == 1) ? '0' + x : x;
  };

  var r, g, b;
  if (ratio > 0.5) {
    newRatio = ratio - 0.5;
    r = Math.ceil(parseInt(color1.substring(0,2), 16) * ratio + parseInt(color2.substring(0,2), 16) * (0.5-newRatio));
    g = Math.ceil(parseInt(color1.substring(2,4), 16) * ratio + parseInt(color2.substring(2,4), 16) * (0.5-newRatio));
    b = Math.ceil(parseInt(color1.substring(4,6), 16) * ratio + parseInt(color2.substring(4,6), 16) * (0.5-newRatio));
  } else if (ratio == 0.5) {
    r = 255;
    g = 190;
    b = 0;
  } else {
    newRatio = ratio * 2;
    r = Math.ceil(parseInt(color2.substring(0,2), 16) * newRatio + parseInt(color3.substring(0,2), 16) * (1-newRatio));
    g = Math.ceil(parseInt(color2.substring(2,4), 16) * newRatio + parseInt(color3.substring(2,4), 16) * (1-newRatio));
    b = Math.ceil(parseInt(color2.substring(4,6), 16) * newRatio + parseInt(color3.substring(4,6), 16) * (1-newRatio));
  }
  return hex(r) + hex(g) + hex(b);
};

var riskColor = function(ratio) {
  var color = '#' + pickHex('ff0000', 'ffd300', '97c93c', ratio);
  return color;
};

var riskLabel = function(risk) {
  var label = "LOW";
  if (risk > 0.666) {
    label = "HIGH";
  } else if (risk > 0.333) {
    label = "MEDIUM";
  }
  return label;
};


_.mixin({ toShortenedNum: function (number) {
  var textNumber;

  if (!number) number = 0;

  var toFixed = function (number) {
    if (number % 1 !== 0) number = number.toFixed(0);

    return number;
  };

  if (number / 1000000 > 1) {
     number = number / 1000000;
     textNumber = toFixed(number).toString() + 'm';
  } else if (number / 1000 > 1) {
    number = number / 1000;
    textNumber = toFixed(number).toString() + 'k';
  } else {
    textNumber = number.toString();
  }
  return textNumber;
}});

