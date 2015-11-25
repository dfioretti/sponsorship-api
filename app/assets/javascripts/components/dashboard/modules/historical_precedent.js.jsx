var HistoricalPrecedent = React.createClass({
  renderList: function() {
    var precedent = [
      {
        "company_id" : 2,
        "date" : "2012-03-01",
        "attacker_name": "Pershing Square Capital",
        "similarity": 0.7
      },
      {
        "company_id" : 1,
        "date" : "2012-08-01",
        "attacker_name": "Icahn Enterprises",
        "similarity": 0.6
      },
      {
        "company_id" : 4,
        "date" : "2011-08-01",
        "attacker_name": "Something Enterprises",
        "similarity": 0.1
      },
      {
        "company_id" : 3,
        "date" : "2010-08-01",
        "attacker_name": "Other Enterprises",
        "similarity": 0.9
      }
    ]

    var list = $.map(precedent, function(item, i) {
      var company = CompaniesStore.find(item.company_id.toString());
      if (typeof(company) != 'undefined') {
        var name = company.name;
        var probability = item.similarity;
        var date = new Date(item.date);
        return <ProbabilityListItem key={i} title={name} probability={probability} rightText={date.getFullYear()} />
      }
    });
    return (
      <ul className="probability-list historical-precedent-list short">
        {list}
      </ul>
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
