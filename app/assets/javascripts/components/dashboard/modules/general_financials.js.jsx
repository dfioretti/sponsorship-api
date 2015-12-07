var GeneralFinanacials = React.createClass({
  componentDidMount: function() {
    $('.general-financials-list').jScrollPane();
  },
  renderList: function() {
    // DUMMY DATA
    var data = [
      // {
      //   "data_type" : "price",
      //   "data_type_display_name" : "price",
      //   "value" : 35.17,
      // },
      // {
      //   "data_type" : "roc_1",
      //   "data_type_display_name" : "Percentage change",
      //   "value" : 3.11,
      // },
      {
        "data_type" : "one_year_return",
        "data_type_display_name" : "Year change",
        "value" : "+12.30",
      },
      {
        "data_type" : "volume",
        "data_type_display_name" : "Shares Traded",
        "value" : "73.5M",
      },
      {
        "data_type" : "market_cap",
        "data_type_display_name" : "Market Cap",
        "value" : "112.14B",
      },
      {
        "data_type" : "enterprise_value",
        "data_type_display_name" : "Enterprise Value",
        "value" : "100.12B",
      },
    ];

    var cn = "change-icon ";
    var list = $.map(data, function(item, i) {
      var name = item.data_type_display_name;
      var value = item.value;
      return <ProbabilityListItem key={i} title={name} rightText={value} />
    });
    return (
      <ul className="probability-list general-financials-list">
        <li className="stock">
          <div className="right">
            <div className="price"><span className={cn}></span>35.17</div>
            <div className="change">+1.09 (3.11%)</div>
          </div>
          <div className="left">
            <div className="ticker">{this.props.company.ticker}</div>
            <div className="time">Today 3:25 <small>PM</small></div>
          </div>
        </li>
        {list}
      </ul>
    );
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
