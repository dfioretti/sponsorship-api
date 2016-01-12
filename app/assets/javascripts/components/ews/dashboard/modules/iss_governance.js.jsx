var IssGovernance = React.createClass({
  getInitialState: function() {
    return {scrollLoaded: false, items: []};
  },
  componentWillMount: function() {
    this.getData();
  },
  componentWillReceiveProps: function(newProps) {
    if (this.props.hidden != newProps.hidden && !newProps.hidden && !this.state.scrollLoaded) {
      if (!this.state.wait) {
        this.setState({scrollLoaded: true});
        $('.iss-governance-list-container').jScrollPane();
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
      APIEndpoints.COMPANY,
      {id: p.company.api_id},
      function(data) {
        items = [
          {name: "ISS Overall QuickScore Rank", value: data.iss_data["OverallQSRank"]},
          {name: "ISS Audit Rank", value: data.iss_data["AuditRank"]},
          {name: "ISS Shareholder Rank", value: data.iss_data["ShareholderRank"]},
          {name: "ISS Compensation Rank", value: data.iss_data["CompensationRank"]},
          {name: "ISS Board Rank", value: data.iss_data["BoardRank"]},
        ]
        this.setState({items: items}, function() {
          if (!this.state.scrollLoaded && !p.hidden) {
            $('.iss-governance-list-container').jScrollPane();
            this.setState({scrollLoaded: true});
          } else if (this.state.wait) {
            if (typeof($('.iss-governance-list-container').data('jsp')) == "undefined") {
              $('.iss-governance-list-container').jScrollPane();
              this.setState({scrollLoaded: true});
            }
            this.setState({wait: false});
          } else {
            $('.iss-governance-list-container').data('jsp').destroy();
            $('.iss-governance-list-container').jScrollPane();
            $('.iss-governance-list-container').data('jsp').addHoverFunc();
          }
        }.bind(this));
      }.bind(this)
    )
  },
  renderList: function() {
    var list = $.map(this.state.items, function(item, i) {
      var name = item.name;
      var rank = item.value;
      return <ProbabilityListItem key={i} title={name} probability={rank/10} rightText={rank}/>
    });
    return (
      <div className="iss-governance-list-container">
        <ul className="probability-list iss-governance-list">
          {list}
        </ul>
      </div>
    );
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="iss_governance" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">ISS Governance Data</div>
        </div>
        <div className="main">
          {this.renderList()}
        </div>
      </div>
    );
  }
});
