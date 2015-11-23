var RiskIndicators = React.createClass({
  renderList: function() {
    var indicators = [
      {
        "data_type": "norm_pe_ratio",
        "data_type_display_name":"P/E Ratio",
        "importance": 0.9,
        "model_rank" : 0
      },
      {
        "data_type": "ebitda_margin",
        "data_type_display_name":"EBITDA Margin",
        "importance": 0.8,
        "model_rank" : 3
      }
    ]

    var list = $.map(indicators, function(item, i) {
      var tooltip = "Click to see chart"
      var dataType = item.data_type_display_name;
      var probability = item.importance;
      return <ProbabilityListItem key={i} tooltip={tooltip} title={dataType} probability={probability} />
    });
    return (
      <ul className="probability-list risk-indicator-list">
        {list}
      </ul>
    );
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="risk_indicators" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Risk Indicators</div>
        </div>
        <div className="main">
          <div className="filters">
            <div className="filter value-filter">Filter by Value <span className="caret"></span></div>
            <div className="filter severity-filter">Filter by Severity <span className="caret"></span></div>
          </div>
          {this.renderList()}
        </div>
      </div>
    );
  }
});
