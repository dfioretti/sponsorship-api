var DataList = React.createClass({
  mixins: [
    jScrollpaneMixin
  ],
  getInitialState: function() {
    return {scrollId: uuid.v4(), scrollLoaded: false, viewData: {}};
  },
  componentDidMount: function() {
    console.log("DID MT");
    if (!this.state.scrollLoaded) {
      console.log("doing scroll");
      this.setState({scrollLoaded: true});
      $('#testme').jScrollPane();
    }
  },
  componentWillMount: function() {
    console.log("WILL MT");
    this.setState({ viewData: this.props.viewData });
    this.setState({ dataLoaded: true});
  },
  componentDidRecieveProps: function() {
      console.log("DID PRO");
  },
  componentWillReceiveProps: function(newProps) {
    console.log("will props " + newProps);
    if (newProps.componentId != this.props.componentId) {
    }
    if (!this.state.scrollLoaded) {
      console.log("loading scroll...");
      this.setState({scrollLoaded: true});
      $('#' + this.state.scrollId).jScrollPane();
    }
  },
  renderBars: function() {
    console.log("bars?");
    // TODO - fix the generic bars
    var listData = this.state.listData;
    var list = $.map(listData, function(item, i) {
      var dataType = item['data_type_display_name'];
      var barData = item['importance'];
      var value = item['value'];
      return <GenericBarListItem key={i} rightText={value} title={dataType} probability={barData} />
    }.bind(this));

    var overrideMargin = {
      marginLeft: "-20px",
    };
    return (
      <div className="risk-indicator-list-container">
        <ul style={overrideMargin} className="probability-list risk-indicator-list">
          {list}
        </ul>
      </div>
    );

  },
  commaSeparateNumber: function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  },
  renderValues: function() {
    console.log("render values !");
    console.log(this.state.viewData);
    var listData = this.state.viewData;

    listData.sort(function(i1, i2){
      var order;
      var field1 = i1['metric']
      var field2 = i2['metric']
      order = field1 < field2 ? 1 : -1
      return order;
    }.bind(this));

    var list = $.map(listData, function(item, i) {
      console.log("item in render " + item);
      var assetLink = "/apt/asset/dashboard/" + item.asset_id;
      return <GenericValueListItem key={i} trend={item.trend} link={assetLink} statImage={item.image} statHeader={item.name} statMetric={item.metric} />
    }.bind(this));

    // was social-stats-list in a div
    // <ul className="trend-list light global-issues-list probability-list risk-indicator-list">
    // deleted probabilyt list..

    return (
        <ul className="generic-list">
          {list}
        </ul>
    );
  },
  renderList: function() {
      if(this.props.type === "bar") return this.renderBars();
      else return this.renderValues();
  },
  render: function() {
    return (
      <div id={this.state.scrollId} className="global-issues-list-container" onScroll={this.toggleScrollActive} ref="jScrollContainer" >
        {this.renderList()}
      </div>
    );
  }
});
