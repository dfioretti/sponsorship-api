var Sidebar = React.createClass({
  componentDidMount: function() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  showTooltip: function() {
    $('.custom-tooltip').show();
  },
  hideTooltip: function() {
    $('.custom-tooltip').hide();
  },
  renderToggles: function() {
    var toggles = $.map(ModuleToggles, function(name){
      var cn = "icon " + name;
      var title = name.replace(/_/g, ' ')
      var state = this.props.dashboardState;
      var toggleValue = state[name]["toggle"];

      return (
        <li key={name}>
          <Toggle toggleValue={toggleValue} module={name} handleToggle={this.props.handleToggle}/>
          <div className={cn}>{title}</div>
        </li>
      );
    }.bind(this));
    return (
      <ul className="toggle-list">
        {toggles}
      </ul>
    );
  },
  render: function() {
    var company = CompaniesStore.getState().current;
    var ratio = company.score/5;
    var color = riskColor(ratio);
    var barStyle = {backgroundColor: color, width: 80 * ratio}
    var left = 93 + ratio * 80;
    var tooltipStyle = {left: left, backgroundColor: color}
    var arrowStyle = {borderTop: "20px solid " + color}

    return (
      <div className="sidebar">
        <div className="top" onMouseLeave={this.hideTooltip}>
          <div className="top-title">Risk Overview</div>
          <div className="bkg-bar" onMouseOver={this.showTooltip}>
            <div className="fill-bar" style={barStyle}></div>
            <div className="custom-tooltip" style={tooltipStyle}>
              {company.risk}
              <div className="custom-tooltip-arrow" style={arrowStyle}></div>
            </div>
          </div>
        </div>
        <div className="module-toggle-container">
          {this.renderToggles()}
        </div>
        <div className="print-report">
          <ul>
            <li>
              <div className="gear"></div>
              <div className="icon print-report">Print Report</div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
