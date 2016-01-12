var GlobalIssues = React.createClass({
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="global_issues" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Top Global Issues</div>
        </div>
      </div>
    );
  }
});
