var InsightsImplications = React.createClass({
  getInitialState: function() {
    return {scrollLoaded: false, insights: []};
  },
  addInsight: function() {
    if (typeof($('.media-list').data('jsp')) != "undefined") {
      $('.media-list').data('jsp').destroy();
      this.setState({insights: InsightsStore.getState().insights}, function() {
        $('.media-list').jScrollPane({contentWidth: '0px'});
        $('.media-list').data('jsp').addHoverFunc();
      });
    }
  },
  componentWillReceiveProps: function(newProps) {
    this.addInsight();

    if (this.props.hidden != newProps.hidden && !newProps.hidden && !this.state.scrollLoaded) {
      this.setState({scrollLoaded: true});
      $('.media-list').jScrollPane({contentWidth: '0px'});
    }
  },
  createInsight: function (args) {
    var self = this;

    return InsightsStore.create(args).then(function () {
        self.addInsight();
    });
  },
  renderList: function () {
    var insights = $.map(this.state.insights, function(item) {
      return (<InsightListItem key={item.id} item={item} />);
    });
    return (
      // <div className="media-list-container">
        <ul className="text-list media-list">
          {insights}
        </ul>
      // </div>
    );
  },
  componentDidMount: function () {
    var self = this;
    InsightsStore.setCompanyId(this.props.company_id).then(function () {
      self.addInsight();
    });

    (function poll(){
      var timeoutId = setTimeout(function(){
        InsightsStore.poll(self.props.company_id).then(function(insights){
          self.addInsight();
          poll();
        });
      }, 10000);
      self.setState({timeoutId: timeoutId})
    })();

    // TODO refactor the jScrollPane implementation
    if (!this.state.scrollLoaded && !this.props.hidden) {
      $('.media-list').jScrollPane({contentWidth: '0px'});
      this.setState({scrollLoaded: true});
    }
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="insights_implications" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Insights & Implications</div>
        </div>
        <div className="main">
          {this.renderList()}
          <NotableForm company_id={this.props.company_id} saveHandler={this.createInsight} validateFile={true} />
        </div>
      </div>
    );
  }
});
