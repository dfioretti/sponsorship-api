var LikelyAttackers = React.createClass({
  renderList: function() {
    var attackers = [
      {
        "attacker_name": "Pershing Square Capital",
        "likelihood": 0.7
      },
      {
        "attacker_name": "Icahn Enterprises",
        "likelihood": 0.6
      },
      {
        "attacker_name": "Low Risk Capital",
        "likelihood": 0.1
      },
      {
        "attacker_name": "Something Enterprises",
        "likelihood": 0.3
      },
      {
        "attacker_name": "Snacks Capital",
        "likelihood": 0.8
      },
      {
        "attacker_name": "Hungry Enterprises",
        "likelihood": 0.4
      }
    ]

    var list = $.map(attackers, function(item, i) {
      var attacker = item.attacker_name
      var probability = item.likelihood;
      return <ProbabilityListItem key={i} title={attacker} probability={probability} />
    });
    return (
      <ul className="probability-list likely-attackers-list short">
        {list}
      </ul>
    );
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="likely_attackers" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Likely Attackers</div>
        </div>
        <div className="main">
          <div className="legend">
            <div className="legend-item"><div className="legend-point legend-color-1"></div>High Likelihood</div>
            <div className="legend-item"><div className="legend-point legend-color-2"></div>Medium Likelihood</div>
            <div className="legend-item"><div className="legend-point legend-color-3"></div>Low Likelihood</div>
          </div>
          {this.renderList()}
        </div>
      </div>
    );
  }
});
