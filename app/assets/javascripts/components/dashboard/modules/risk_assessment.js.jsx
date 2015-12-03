var RiskAssessment = React.createClass({
  componentDidMount: function() {
    var pos = (292 * this.props.company.risk / 1) - 8;
    $('.slider-button').animate({left: pos}, 1000);
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    var company = this.props.company;

    return (
      <div id="risk_assessment" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Risk Assessment</div>
        </div>
        <div className="main">
          <div className="risk">{riskLabel(company.risk)}</div>
          <div className="subheader">Risk Score</div>
          <div className="slider-bar">
            <div className="slider-button"></div>
          </div>
        </div>
      </div>
    );
  }
});
