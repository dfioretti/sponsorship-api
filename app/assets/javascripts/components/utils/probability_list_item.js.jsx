var ProbabilityListItem = React.createClass({
  getInitialState: function() {
    return {loaded: false};
  },
  componentWillReceiveProps: function() {
    var bar = ReactDOM.findDOMNode(this.refs.bar);
    $(bar).animate({width: this.props.probability * 100}, 1000, function() {
      this.setState({loaded: true});
    }.bind(this));
  },
  showTooltip: function(e) {
    var tooltip = $('.li-tooltip');
    var top = $(e.target).offset().top - 50,
    left = $(e.target).offset().left - 45;

    if (tooltip.length < 1) {
      $('.dashboard').append(
        '<div class="li-tooltip" style="top:'+top+'px;left:'+left+'px;">' +
          'Click to see chart<div class="li-tooltip-arrow"></div>' +
        '</div>'
      );
    }
    tooltip.css({top: top, left: left});
    tooltip.show();
  },
  hideTooltip: function(e) {
    $('.li-tooltip').hide();
  },
  renderTooltip: function() {
    var tooltip;
    if (this.props.tooltip) {
      var link = '/dashboard/' + this.props.companyId + '/detail';
      tooltip = (
        <Link to={link} className="li-tooltip-button" onMouseOver={this.showTooltip} onMouseLeave={this.hideTooltip}>
        </Link>
      );
    }
    return tooltip;
  },
  renderRightText: function() {
    var text;
    if (this.props.rightText) {
      text = (
        <div className="li-right-text">{this.props.rightText}</div>
      );
    }
    return text;
  },
  renderProbability: function() {
    var probabilityBar;
    if (this.props.probability) {
      var probabilityStyle = {backgroundColor: riskColor(this.props.probability)};
      if (this.state.loaded) {
        probabilityStyle.width = this.props.probability * 100;
      }
      probabilityBar = (
        <div className="li-probability-bkg">
          <div className="li-probability-bar" ref="bar" style={probabilityStyle}></div>
        </div>
      );
    }
    return probabilityBar;
  },
  render: function() {
    return (
      <li className="probability-list-item">
        {this.renderProbability()}
        {this.renderRightText()}
        {this.renderTooltip()}
        <div className="li-title">{this.props.title}</div>
      </li>
    );
  }
});
