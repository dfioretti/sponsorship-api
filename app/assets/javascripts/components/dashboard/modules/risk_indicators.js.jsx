var RiskIndicators = React.createClass({
  getInitialState: function() {
    return {orderBy: {field: "data_type_display_name", order: 0}};
  },
  componentDidMount: function() {
    $('.risk-indicator-list').jScrollPane();
  },
  order: function(value) {
    switch (value) {
      case 0:
        var order = 0;
        if (this.state.orderBy.field == "data_type_display_name" && this.state.orderBy.order == 0) {
          order = 1;
        }
        this.setState({orderBy: {field: "data_type_display_name", order: order}});
        break;
      case 1:
        var order = 0;
        if (this.state.orderBy.field == "importance" && this.state.orderBy.order == 0) {
          order = 1;
        }
        this.setState({orderBy: {field: "importance", order: order}});
        break;
    }
  },
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
      },
      {
        "data_type": "test_ratio",
        "data_type_display_name":"Test Ratio",
        "importance": 0.2,
        "model_rank" : 2
      },
      {
        "data_type": "other_margin",
        "data_type_display_name":"Other Margin",
        "importance": 0.3,
        "model_rank" : 4
      }
    ]

    if (this.state.orderBy) {
      indicators.sort(function(i1, i2){
        var order;

        if (this.state.orderBy.order == 0) {
          order = i1[this.state.orderBy.field] > i2[this.state.orderBy.field]
        } else {
          order = i1[this.state.orderBy.field] < i2[this.state.orderBy.field]
        }
        return order;
      }.bind(this));
    }

    var list = $.map(indicators, function(item, i) {
      var tooltip = "Click to see chart"
      var dataType = item.data_type_display_name;
      var probability = item.importance;
      return <ProbabilityListItem key={i} tooltip={tooltip} title={dataType} probability={probability} companyId={this.props.company.id} />
    }.bind(this));
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
            <div className="filter value-filter" onClick={this.order.bind(this, 0)}>Filter by Value <span className="caret"></span></div>
            <div className="filter severity-filter" onClick={this.order.bind(this, 1)}>Filter by Severity <span className="caret"></span></div>
          </div>
          {this.renderList()}
        </div>
      </div>
    );
  }
});
