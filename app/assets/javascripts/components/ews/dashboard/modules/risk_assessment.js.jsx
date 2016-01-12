var RiskAssessment = React.createClass({
  componentDidMount: function() {
    var pos = (292 * this.props.company.risk / 1) - 8;
    $('.slider-button').animate({left: pos}, 1000);
  },
  componentWillReceiveProps: function(newProps) {
    var pos = (292 * newProps.company.risk / 1) - 8;
    $('.slider-button').animate({left: pos}, 1000);
  },
  showTooltip: function(e) {
    $('#risk-assessment-tooltip').show();
  },
  hideTooltip: function(e) {
    $('#risk-assessment-tooltip').hide();
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    var company = this.props.company;

    var ratio = company.risk;
    var left = ratio * 300 - 30;
    var color = riskColor(ratio);
    var tooltipStyle = {left: left, top: -66, backgroundColor: color};
    var arrowStyle = {borderTop: "20px solid " + color};

    return (
      <div id="risk_assessment" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Risk Assessment</div>
        </div>
        <div className="main">
          <div className="risk">{riskLabel(company.risk)}</div>
          <div className="subheader">Risk Score</div>
          <div className="slider-bar" onMouseOver={this.showTooltip} onMouseLeave={this.hideTooltip}>
            <div className="slider-button"></div>
            <div id="risk-assessment-tooltip" className="custom-tooltip" style={tooltipStyle}>
              <span className="risk-label">{(parseFloat(company.risk) * 100).toFixed(2)}%</span>
              <div className="custom-tooltip-arrow" style={arrowStyle}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
