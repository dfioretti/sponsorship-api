var AssetOverview = React.createClass({
  componentDidMount: function() {
    $(this.refs.flipper).flip();
  },
  componentWillReceiveProps: function(newProps) {
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    var asset = this.props.asset;

    return (
      <div id="asset_overview" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">{asset.name}</div>
        </div>
        <div className="main" ref="flipper">
          <div id="card">
            <div className="large-logo front">
              <img src={asset.image_url}/>
              <ul className="card-metrics">
                <li>
                  <div className="metric">{asset.pretty_renewal}</div>
                  <div className="metric-label">Renewal</div>
                </li>
                <li>
                  <div className="metric">{asset.pretty_cost}</div>
                  <div className="metric-label">Cost</div>
                </li>
                <li>
                  <div className="metric">{asset.pretty_term}</div>
                  <div className="metric-label">Term</div>
                </li>
              </ul>
            </div>
            <div className="back small-padding">
              <h4>Asset Bio</h4>
              <p>
              {asset.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
