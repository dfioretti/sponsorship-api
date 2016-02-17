var AssetOverview = React.createClass({
  componentDidMount: function() {
    console.log("did mount");
  },
  componentWillReceiveProps: function(newProps) {
    console.log("props");
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    console.log("render");

    return (
      <div id="asset_overview" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Asset Overview</div>
        </div>
        <div className="main">
        </div>
      </div>
    );
  }
});
