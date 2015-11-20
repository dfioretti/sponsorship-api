var RiskAssessment = React.createClass({
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    var company = this.props.company;
    var pos = (292 * company.score / 5) - 8;
    var buttonStyle = {left: pos};
    return (
      <div id="risk_assessment" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Risk Assessment</div>
        </div>
        <div className="main">
          <div className="risk">{company.risk}</div>
          <div className="subheader">Risk Score</div>
          <div className="slider-bar">
            <div className="slider-button" style={buttonStyle}></div>
          </div>
        </div>
      </div>
    );
  }
});
