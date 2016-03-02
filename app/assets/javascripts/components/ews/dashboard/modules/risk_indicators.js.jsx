var RiskIndicators = React.createClass({
  getInitialState: function() {
    return {scrollLoaded: false, orderBy: {field: "model_rank", order: 1}, indicators: []};
  },
  componentWillMount: function() {
    this.getData();
  },
  componentWillReceiveProps: function(newProps) {
    console.log("will rec prop");
    if (this.props.hidden != newProps.hidden && !newProps.hidden && !this.state.scrollLoaded) {
      if (!this.state.wait) {
        this.setState({scrollLoaded: true});
        $('.risk-indicator-list-container').jScrollPane();
      }
    }

    if (this.props.company.id != newProps.company.id) {
      this.setState({wait: true}, function(){
        this.getData(newProps);
      }.bind(this));
    }
  },
  getData: function(props) {
    console.log("get data");
    var p = props ? props : this.props;
    Dispatcher.apiGet(
      APIEndpoints.RISK_INDICATORS,
      {id: p.company.api_id},
      function(data) {
        this.setState({indicators: data}, function() {
          if (!this.state.scrollLoaded && !p.hidden) {
            $('.risk-indicator-list-container').jScrollPane();
            this.setState({scrollLoaded: true});
          } else if (this.state.wait) {
            if (typeof($('.risk-indicator-list-container').data('jsp')) == "undefined") {
              $('.risk-indicator-list-container').jScrollPane();
              this.setState({scrollLoaded: true});
            } else {
              $('.risk-indicator-list-container').data('jsp').destroy();
              $('.risk-indicator-list-container').jScrollPane();
              $('.risk-indicator-list-container').data('jsp').addHoverFunc();
            }
            this.setState({wait: false});
          }
        }.bind(this));
      }.bind(this)
    );
  },
  order: function(value, e) {
    $('#risk_indicators .filter').removeClass('asc');
    switch (value) {
      case 0:
        var order = 1;
        if (this.state.orderBy.field == "model_rank" && this.state.orderBy.order == 1) {
          $(e.target).closest('.filter').addClass('asc');
          order = 0;
        }
        this.setState({orderBy: {field: "model_rank", order: order}});
        break;
      case 1:
        var order = 1;
        if (this.state.orderBy.field == "importance" && this.state.orderBy.order == 1) {
          $(e.target).closest('.filter').addClass('asc');
          order = 0;
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

        if (this.state.orderBy.order == 0) {
          order = field1 > field2 ? 1 : -1
        } else {
          order = field1 < field2 ? 1 : -1
        }

        return order;
      }.bind(this));
    }

    var list = $.map(indicators, function(item, i) {
      // var tooltip = "Click to see chart"
      var dataType = item.data_type_display_name;
      var probability = item.importance;
      return <ProbabilityListItem key={i} link={true} title={dataType} probability={probability} companyId={this.props.company.id} />
    }.bind(this));
    return (
      <div className="risk-indicator-list-container">
        <ul className="probability-list risk-indicator-list">
          {list}
        </ul>
      </div>
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
            <div className="filter value-filter" onClick={this.order.bind(this, 0)}>Sort by Importance to Model <span className="caret"></span></div>
            <div className="filter severity-filter" onClick={this.order.bind(this, 1)}>Sort by Severity <span className="caret"></span></div>
          </div>
          {this.renderList()}
        </div>
      </div>
    );
  }
});
