//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require jquery-deparam
//= require jquery.cookie
//= require jquery.shapeshift.min
//= require jquery.scrollstop.min
//= require jquery.mousewheel
//= require jscrollpane
//= require pubsub
//= require jtoker
//= require EventEmitter.min
//= require Immutable.min
//= require s3upload
//= require uuid
//= require moment.min
//= require chartist.min

//= require bootstrap-sprockets
//= require turbolinks

//= require react
//= require react_ujs
//= require react_router
//= require react_router_ujs

//= require components

var pickHex = function(color1, color2, ratio) {
  var hex = function(x) {
      x = x.toString(16);
      return (x.length == 1) ? '0' + x : x;
  };

  var r = Math.ceil(parseInt(color1.substring(0,2), 16) * ratio + parseInt(color2.substring(0,2), 16) * (1-ratio));
  var g = Math.ceil(parseInt(color1.substring(2,4), 16) * ratio + parseInt(color2.substring(2,4), 16) * (1-ratio));
  var b = Math.ceil(parseInt(color1.substring(4,6), 16) * ratio + parseInt(color2.substring(4,6), 16) * (1-ratio));

  return hex(r) + hex(g) + hex(b);
}

var riskColor = function(ratio) {
  var color = '#' + pickHex('ff0000', 'ffd300', ratio);
  return color;
}

var riskLabel = function(risk) {
  var label = "Low";
  if (risk > 0.666) {
    label = "High";
  } else if (risk > 0.333) {
    label = "Medium";
  }
  return label;
}
