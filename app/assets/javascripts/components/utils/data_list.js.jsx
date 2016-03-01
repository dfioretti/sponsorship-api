var DataList = React.createClass({
  mixins: [
    jScrollpaneMixin
  ],
  getInitialState: function() {
    return {scrollLoaded: false, listData: {}};
  },
  componentDidMount: function() {
    this.loadData();
  },
  componentWillReceiveProps: function(newProps) {
    if (newProps.componentId != this.props.componentId) {
      this.loadData();
    }
    if (!this.state.scrollLoaded) {
      console.log("loading scroll...");
      this.setState({scrollLoaded: true});
      $('.data-list-container').jScrollPane();
    }
  //  if (newProps.component.id != this.props.component.id) {
  //    this.loadData();
  //  }
  },
  loadData: function() {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/api/v1/apt/asset/mock_data",
      data: {"type" : "survey"},
      success: function(data, status, xhr) {
        this.setState({listData: data.survey}, function() {
          this.setState({wait: false});

        }.bind(this));
      }.bind(this),
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  },
  renderBars: function() {
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
    var listData = this.state.listData;
    var list = $.map(listData, function(item, i) {
      var statImage = "https://logo.clearbit.com/www.twitter.com";
      var statHeader = "Test Header"
      var statMetric = this.commaSeparateNumber(23423423);
      return <GenericValueListItem key={i} statImage={statImage} statHeader={statHeader} statMetric={statMetric} />
    }.bind(this));

    // was social-stats-list in a div
    return (
        <ul className="trend-list light global-issues-list">
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
      <div className="global-issues-list-container" onScroll={this.toggleScrollActive}>
        {this.renderList()}
      </div>
    );
  }
});
