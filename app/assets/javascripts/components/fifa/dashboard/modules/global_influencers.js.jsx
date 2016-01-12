var GlobalInfluencers = React.createClass({
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="global_influencers" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Top Global Influencers</div>
        </div>
      </div>
    );
  }
});
