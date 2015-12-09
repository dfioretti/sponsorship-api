var LikelyAttackers = React.createClass({
  getInitialState: function() {
    return {scrollLoaded: false, attackers: []};
  },
  componentWillMount: function() {
    this.getData();
  },
  componentWillReceiveProps: function(newProps) {
    if (this.props.hidden != newProps.hidden && !newProps.hidden && !this.state.scrollLoaded) {
      if (!this.state.wait) {
        this.setState({scrollLoaded: true});
        $('.likely-attackers-list').jScrollPane();
      }
    }

    if (this.props.company.id != newProps.company.id) {
      this.setState({wait: true}, function(){
        this.getData(newProps);
      }.bind(this));
    }
  },
  getData: function(props) {
    var p = props ? props : this.props;

    Dispatcher.apiGet(
      APIEndpoints.LIKELY_ATTACKERS,
      {id: p.company.api_id},
      function(data) {
        this.setState({attackers: data}, function() {
          if (!this.state.scrollLoaded && !p.hidden) {
            $('.likely-attackers-list').jScrollPane();
            this.setState({scrollLoaded: true});
          } else if (this.state.wait) {
            if (typeof($('.likely-attackers-list').data('jsp')) == "undefined") {
              $('.likely-attackers-list').jScrollPane();
              this.setState({scrollLoaded: true});
            }
            this.setState({wait: false});
          }
        }.bind(this));
      }.bind(this)
    );
  },
  renderList: function() {
    var list = $.map(this.state.attackers, function(item, i) {
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
