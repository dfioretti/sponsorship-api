var FifaGlobalIssuesCard = React.createClass({
  renderList: function () {
    return _.map(this.props.issues, function (issue) {
      return(<GlobalIssuesItem key={issue.title} item={issue} />);
    });
  },
  render: function () {
    return(
      <div id="global-issues-volume" className="detail-module detail-chart">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.moduleTitle}</div>
        </div>
        <div className="main main-centered">
          <ul className="trend-list light global-issues-list">
            {this.renderList()}
          </ul>
        </div>
      </div>
    );
  }
});