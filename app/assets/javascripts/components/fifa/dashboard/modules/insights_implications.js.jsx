var InsightsImplications = React.createClass({
  mixins: [jScrollpaneMixin],
  getInitialState: function() {
    return {scrollLoaded: false, insights: []};
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
  addInsight: function() {
    this.setState({insights: this.filterInsights(this.state.query)});
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
  handleTagClick: function (tag) {
    this.setState({
      query: tag.name,
      insights: this.filterInsights(tag.name)
    });
  },
  updateSearchInput: function (e) {
    this.setState({
      query: e.target.value,
      insights: this.filterInsights(e.target.value)
    });
  },
  filterInsights: function (query) {
    var updatedInsights = InsightsStore.getState().insights;

    var isQueryMatch = function (keys, query) {
      var isMatch;
      var regex = new RegExp(query, 'i');

      isMatch = _.filter(keys, function (key) {
        return this[key].match(regex);
      }.bind(this)).length > 0;

      return isMatch;
    };

    if (query && query.length) {
      updatedInsights = _.filter(updatedInsights, function (insight) {
        var isTagMatch = _.filter(insight.tags, function (tag) {
          return isQueryMatch.bind(tag, ['name'], query);
        }).length > 0;

        return isTagMatch || isQueryMatch.bind(insight, ['attachment_name', 'body'], query)();
      });
    }

    return updatedInsights;
  },
  renderList: function () {
    var insights = $.map(this.state.insights, function(item) {
      return (<InsightListItem key={item.id} item={item} handleTagClick={this.handleTagClick} />);
    }.bind(this));
    return (
      <div className="media-list-scrollable-tall" ref="jScrollContainer" onScroll={this.toggleScrollActive}>
        <ul id="insight-list" className="text-list media-list">
          {insights}
        </ul>
      </div>
    );
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
          <div className="filters-search-form filters media-list-filters" ref="searchForm">
            <input className="filters-search-input" placeholder="Filter by Tag" value={this.state.query} onChange={this.updateSearchInput} />
          </div>
          {this.renderList()}
          <NotableForm company_id={this.props.company_id} saveHandler={this.createInsight} validateFile={true} bodyPlaceholder="Add optional comments..." tagsEnabled={true} />
        </div>
      </div>
    );
  }
});
