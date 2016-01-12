var InsightsImplications = React.createClass({
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="insights_implications" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Insights & Implications</div>
        </div>
      </div>
    );
  }
});
