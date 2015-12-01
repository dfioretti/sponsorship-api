var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var CompanyDetail = React.createClass({
  getInitialState: function() {
    return {loaded: false};
  },
  componentWillMount: function() {
    CompaniesStore.setCurrent(this.props.params.id);
    this.setState({loaded: true});
  },
  componentDidMount: function() {
    $('.charts-container').shapeshift({
      selector: ".detail-module",
      handle: ".drag-handle",
      align: "left",
      autoHeight: false,
      gutterX: 20,
      gutterY: 20,
      paddingX: 20,
      paddingY: 20
    });
  },
  renderSubnav: function() {
    var link = '/dashboard/' + this.props.params.id;

    return (
      <div className="details-subnav">
        <div className="details-left-nav">
          <Link to={link}><div className="back-icon"></div></Link>
          <div className="to-dashboard">Risk Indicators</div>
          <div className="filter">Print Report</div>
        </div>
        <div className="details-right-nav">
          <div className="filters">
            <div className="filter value-filter">Filter by Value <span className="caret"></span></div>
            <div className="filter severity-filter">Filter by Severity <span className="caret"></span></div>
          </div>
        </div>
      </div>
    );
  },
  renderCharts: function() {
    // DUMMY DATA
    var data = [
      {title: 'P/E Ratio'},
      {title: 'Volatility'},
      {title: 'EBITDA Margin'},
      {title: 'Price to Book Ratio'},
      {title: 'Capex to Revenue'},
      {title: '1 Month TSR'}
    ];

    var charts = $.map(data, function(v, k){
      return <DetailChart key={k} data={v} company={CompaniesStore.getState().current} />
    });

    return (
      <div className="charts-container">
        {charts}
      </div>
    );
    return charts;
  },
  render: function() {
    if (this.state.loaded) {
      return (
        <div className="company-detail">
          <Sidebar {...this.props} minimal/>
          {this.renderSubnav()}
          <div className="charts-box">
            {this.renderCharts()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="company-details"></div>
      );
    }
  }
});
