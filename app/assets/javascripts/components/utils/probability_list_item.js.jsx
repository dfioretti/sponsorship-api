var ProbabilityListItem = React.createClass({
  showTooltip: function(e) {
    $(e.target).children().show();
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
          <div className="li-tooltip">
            {this.props.tooltip}
            <div className="li-tooltip-arrow"></div>
          </div>
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
      var probabilityStyle = {backgroundColor: riskColor(this.props.probability), width: this.props.probability * 100};
      probabilityBar = (
        <div className="li-probability-bkg">
          <div className="li-probability-bar" style={probabilityStyle}></div>
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
