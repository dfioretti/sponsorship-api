var FifaDoughnutDetail = React.createClass({
  render: function () {
    return (
      <div id="global-issues-social" className="detail-module detail-chart">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.moduleTitle}</div>
        </div>
      </div>
    );
  }
});