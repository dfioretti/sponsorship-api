var GlobalHotspots = React.createClass({
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="global_hotspots" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Global Hotspots</div>
        </div>
      </div>
    );
  }
});
