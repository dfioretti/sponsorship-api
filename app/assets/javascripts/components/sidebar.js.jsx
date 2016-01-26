var Sidebar = React.createClass({
  showTooltip: function() {
    $('#sidebar-tooltip').show();
  },
  hideTooltip: function() {
    $('#sidebar-tooltip').hide();
  },
  selectChange: function(e) {
    var selectedDays = e.target.value;

    this.props.onDateRangeSelect(selectedDays)


  },
  renderSocialRating: function() {
    // var tooltipStyle = {left: left, backgroundColor: color}
    // var barStyle = {backgroundColor: color, width: 80 * ratio}
    // var arrowStyle = {borderTop: "20px solid " + color}

    if (this.props.dashboardType == "fifa") {
      return (
        <div className="top social" onMouseLeave={this.hideTooltip}>
          <div className="top-title">Social Media</div>
          <div className="bkg-bar" onMouseOver={this.showTooltip}>
            <div className="fill-bar"></div>
            <div id="sidebar-tooltip" className="custom-tooltip" >
              DUMMY
              <div className="custom-tooltip-arrow"></div>
            </div>
          </div>
          <div className="range-select">
            <select onChange={this.selectChange} value={this.props.defaultRange}>
              <option value="5">Last 5 Days</option>
              <option value="35">Last 5 Weeks</option>
              <option value="150">Last 5 Months</option>
            </select>
          </div>
        </div>
      );
    }
  },
  renderToggles: function() {
    var toggles;
    switch (this.props.dashboardType) {
      case 'ews':
        toggles = ModuleToggles;
        break;
      case 'fifa':
        toggles = FifaModuleToggles;
        break;
    }
    var toggles = $.map(toggles, function(name){
      var cn = "icon " + name,
      title = name.replace(/_/g, ' '),
      state = this.props.dashboardState,
      toggleValue;

      if (state[name])
        toggleValue = state[name]["toggle"];

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
    var ratio = 0.5//company.risk/1;
    var color = riskColor(ratio);
    var barStyle = {backgroundColor: color, width: 80 * ratio}
    var left = 113 + ratio * 80;
    var tooltipStyle = {left: left, backgroundColor: color}
    var arrowStyle = {borderTop: "20px solid " + color}
    var toggles;

    if (!this.props.minimal) {
      toggles = (
        <div>
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
      )
    }

    var cn = "top "
    if (this.props.dashboardType == "fifa") {
      cn += "light"
    }

    return (
      <div className="sidebar">
        <div className={cn} onMouseLeave={this.hideTooltip}>
          <div className="top-title">Risk Overview</div>
          <div className="bkg-bar" onMouseOver={this.showTooltip}>
            <div className="fill-bar" style={barStyle}></div>
            <div id="sidebar-tooltip" className="custom-tooltip" style={tooltipStyle}>
              {riskLabel(company.risk)}
              <div className="custom-tooltip-arrow" style={arrowStyle}></div>
            </div>
          </div>
        </div>
        {this.renderSocialRating()}
        {toggles}
      </div>
    );
  }
});
