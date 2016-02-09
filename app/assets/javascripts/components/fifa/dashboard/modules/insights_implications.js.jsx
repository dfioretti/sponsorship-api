var InsightsImplications = React.createClass({
  mixins: [jScrollpaneMixin],
  getInitialState: function() {
    return {scrollLoaded: false, insights: []};
  },
  addInsight: function() {
    this.setState({insights: InsightsStore.getState().insights}, function () {
      this.loadJScroll();
    }.bind(this));
  },
  componentWillReceiveProps: function(newProps) {
    this.addInsight();
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
      <div className="media-list-scrollable-tall" ref="jScrollContainer">
        <ul id="insight-list" className="text-list media-list">
          {insights}
        </ul>
      </div>
    );
  },
  componentDidMount: function () {
    var self = this;
    InsightsStore.setCompanyId(this.props.company_id).then(function () {
      self.addInsight();
    });

    (function poll(){
      self.timeoutId = setTimeout(function(){
        InsightsStore.poll(self.props.company_id).then(function(insights){
          self.addInsight();
          poll();
        });
      }, 10000);
    })();
  },
  componentWillUnmount: function () {
    clearTimeout(this.timeoutId);
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
          <NotableForm company_id={this.props.company_id} saveHandler={this.createInsight} validateFile={true} bodyPlaceholder="Add optional comments..." tagsEnabled={true} />
        </div>
      </div>
    );
  }
});
