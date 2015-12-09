var GeneralFinanacials = React.createClass({
  getInitialState: function() {
    return {scrollLoaded: false, data: [], loaded: false}
  },
  componentWillMount: function() {
    this.getData();
  },
  componentWillReceiveProps: function(newProps) {
    if (this.props.hidden != newProps.hidden && !newProps.hidden && !this.state.scrollLoaded) {
      if (!this.state.wait) {
        this.setState({scrollLoaded: true});
        $('.general-financials-list').jScrollPane();
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
      APIEndpoints.LATEST_FINANCIAL_DATA,
      {id: p.company.api_id},
      function(data) {
        this.setState({
          price: data.price.value,
          change: data.roc_1.value,
          data: [
            $.extend(data.one_year_return, {data_type_display_name: "Year Change"}),
            $.extend(data.volume, {data_type_display_name: "Shares Traded"}),
            $.extend(data.market_cap, {data_type_display_name: "Market Cap"}),
            $.extend(data.enterprise_value, {data_type_display_name: "Enterprise Value"}),
          ],
          loaded: true
        }, function() {
          if (!this.state.scrollLoaded && !p.hidden) {
            $('.general-financials-list').jScrollPane();
            this.setState({scrollLoaded: true});
          } else if (this.state.wait) {
            if (typeof($('.general-financials-list').data('jsp')) == "undefined") {
              $('.general-financials-list').jScrollPane();
              this.setState({scrollLoaded: true});
            }
            this.setState({wait: false});
          }
        }.bind(this));
      }.bind(this)
    );
  },
  formatNumber: function(n) {
    var r = 0,
    map = ['', 'K', 'M', 'B'];

    while (n > 1000) {
      n /= 1000;
      r++;
    }

    return n.toFixed(2) + map[r];
  },
  formatValue: function(item) {
    var str = "",
    val = item.value;

    switch (item.data_type_display_name) {
      case "Year Change":
        str += val > 0 ? "+" : "-";
        str += Math.abs((val * 100).toFixed(2)) + "%";
        break;
      case "Shares Traded":
        str = this.formatNumber(val * 1000);
        break;
      default:
        str = this.formatNumber(val * 1000 * 1000);
        break;
    }

    return str;
  },
  renderChangeString: function() {
    var change = this.state.change,
    str = "";

    str += change > 0 ? "+" : "-";
    str += Math.abs(this.state.price / (change + 1) - this.state.price).toFixed(2) + " (";
    str += (change * 100).toFixed(2) + "%)";

    return str;
  },
  renderList: function() {
    var cn = "change-icon ";
    if (this.state.change < 0) {
      cn += "down";
    }

    var list = $.map(this.state.data, function(item, i) {
      var name = item.data_type_display_name;
      var value = this.formatValue(item);
      return <ProbabilityListItem key={i} title={name} rightText={value} />
    }.bind(this));
    if (this.state.loaded) {
      return (
        <ul className="probability-list general-financials-list">
          <li className="stock">
            <div className="right">
              <div className="price"><span className={cn}></span>{this.state.price}</div>
              <div className="change">{this.renderChangeString()}</div>
            </div>
            <div className="left">
              <div className="ticker">{this.props.company.ticker}</div>
              <div className="time">Today 3:25 <small>PM</small></div>
            </div>
          </li>
          {list}
        </ul>
      );
    }
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="general_financials" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">General Financials</div>
        </div>
        <div className="main">
          {this.renderList()}
        </div>
      </div>
    );
  }
});
