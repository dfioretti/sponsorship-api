var InsightsImplications = React.createClass({
  getInitialState: function() {
    return {scrollLoaded: false, insights: [
      {
        id: 12,
        company_id: 12,
        attachment: 'http://s3.amazonaws.com/artatlas/painting/images/large/50998.jpg?1423600554',
        body: 'this is a test body'
      }
    ]};
  },

  renderList: function () {
    var insights = $.map(this.state.insights, function(item) {
      return (<InsightListItem key={item.id} item={item} />);
    });
    return (
      <ul className="text-list media-list">
        {insights}
      </ul>
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
          {this.renderList()}
        </div>
      </div>
    );
  }
});
