var HistoricalPrecedent = React.createClass({
  getInitialState: function() {
    return {scrollLoaded: false, precedent: []};
  },
  componentWillMount: function() {
    this.getData();
  },
  componentWillReceiveProps: function(newProps) {
    if (this.props.hidden != newProps.hidden && !newProps.hidden && !this.state.scrollLoaded) {
      if (!this.state.wait) {
        this.setState({scrollLoaded: true});
        $('.historical-precedent-list-container').jScrollPane();
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
      APIEndpoints.HISTORICAL_PRECEDENTS,
      {id: this.props.company.api_id},
      function(data) {
        this.setState({precedent: data}, function() {
          if (!this.state.scrollLoaded && !p.hidden) {
            $('.historical-precedent-list-container').jScrollPane();
            this.setState({scrollLoaded: true});
          } else if (this.state.wait) {
            if (typeof($('.historical-precedent-list-container').data('jsp')) == "undefined") {
              $('.historical-precedent-list-container').jScrollPane();
              this.setState({scrollLoaded: true});
            }
            this.setState({wait: false});
          } else {
            $('.historical-precedent-list-container').data('jsp').destroy();
            $('.historical-precedent-list-container').jScrollPane();
            $('.historical-precedent-list-container').data('jsp').addHoverFunc();
          }
        }.bind(this));
      }.bind(this)
    );
  },
  renderList: function() {
    var list = $.map(this.state.precedent, function(item, i) {
      var company = CompaniesStore.find(item.company_id.toString());
      if (typeof(company) != 'undefined') {
        var name = company.name;
        var probability = item.similarity;
        var date = new Date(item.date);
        return <ProbabilityListItem key={i} title={name} probability={probability} rightText={date.getFullYear()} />
      }
    });
    return (
      <div className="historical-precedent-list-container">
        <ul className="probability-list historical-precedent-list">
          {list}
        </ul>
      </div>
    );
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="historical_precedent" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Historical Precedent</div>
        </div>
        <div className="main">
          <div className="legend">
            <div className="legend-item"><div className="legend-point legend-color-1"></div>Highest Correlation</div>
            <div className="legend-item"><div className="legend-point legend-color-2"></div>High Correlation</div>
            <div className="legend-item"><div className="legend-point legend-color-3"></div>Medium Correlation</div>
          </div>
          {this.renderList()}
        </div>
      </div>
    );
  }
});
