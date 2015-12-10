var RiskIndicators = React.createClass({
  getInitialState: function() {
    return {scrollLoaded: false, orderBy: {field: "data_type_display_name", order: 0}, indicators: []};
  },
  componentWillMount: function() {
    this.getData();
  },
  componentWillReceiveProps: function(newProps) {
    if (this.props.hidden != newProps.hidden && !newProps.hidden && !this.state.scrollLoaded) {
      if (!this.state.wait) {
        this.setState({scrollLoaded: true});
        $('.risk-indicator-list').jScrollPane();
      }
    }

    if (this.props.company.id != newProps.company.id) {
      this.setState({wait: true}, function(){
        this.getData(newProps);
      }.bind(this));
    }
  },
  getData: function(props) {
    var p = props ? props : this.props;

    Dispatcher.apiGet(
      APIEndpoints.RISK_INDICATORS,
      {id: p.company.api_id},
      function(data) {
        console.log(data);
        this.setState({indicators: data}, function() {
          if (!this.state.scrollLoaded && !p.hidden) {
            $('.risk-indicator-list').jScrollPane();
            this.setState({scrollLoaded: true});
          } else if (this.state.wait) {
            if (typeof($('.risk-indicator-list').data('jsp')) == "undefined") {
              $('.risk-indicator-list').jScrollPane();
              this.setState({scrollLoaded: true});
            }
            this.setState({wait: false});
          }
        }.bind(this));
      }.bind(this)
    );
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
    var indicators = this.state.indicators;

    if (this.state.orderBy) {
      indicators.sort(function(i1, i2){
        var order;
        var field1 = i1[this.state.orderBy.field];
        var field2 = i2[this.state.orderBy.field];

        if (typeof(field1) === 'string') {
          field1 = field1.toUpperCase();
        }
        if (typeof(field2) === 'string') {
          field1 = field1.toUpperCase();
        }

        if (this.state.orderBy.order == 0) {
          order = field1 > field2 ? 1 : -1
        } else {
          order = field1 < field2 ? 1 : -1
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
