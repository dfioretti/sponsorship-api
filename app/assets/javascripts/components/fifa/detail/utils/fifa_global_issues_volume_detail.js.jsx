var FifaGlobalIssuesVolumeDetail = React.createClass({
  render: function () {
    return (
      <div className="detail-module detail-chart">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.moduleTitle}</div>
        </div>
        <div className="main">
        </div>
      </div>
    );
  }
});