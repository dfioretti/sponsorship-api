var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var CompanyDetail = React.createClass({
  getInitialState: function() {
    return {loaded: false, indicators: []};
  },
  componentWillMount: function() {
    if (CompaniesStore.getState().ready) {
      this.setLoaded();
    }

    CompaniesStore.on("update", function() {
      this.setLoaded();
    }.bind(this));
  },
  componentDidMount: function() {
  },
  setupGrid: function() {
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
  setLoaded: function() {
    CompaniesStore.setCurrent(this.props.params.id);
    this.setState({loaded: true, company: CompaniesStore.getState().current}, function() {
      this.getRiskIndicators();
    }.bind(this));
  },
  getRiskIndicators: function() {
    console.log('get risk indicators');
    Dispatcher.apiGet(
      APIEndpoints.RISK_INDICATORS,
      {id: this.state.company.api_id},
      function(data) {
        console.log(data);
        this.setState({indicators: data}, function() {
          this.setupGrid();
        }.bind(this));

        var data_types = $.map(data, function(indicator) {
          return indicator.data_type
        });

        this.getCompanyData(data_types);
        // this.getComps(data_types);
      }.bind(this)
    );
  },
  getCompanyData: function(indicators) {
    console.log('get company data');
    Dispatcher.apiGet(
      APIEndpoints.FINANCIAL_DATA,
      {id: this.state.company.api_id, data_type: indicators.join(',')},
      function(data) {
        console.log(data);
        this.setState({companyData: data});
      }.bind(this)
    );
  },
  getComps: function(indicators) {
    Dispatcher.apiGet(
      APIEndpoints.COMPANY,
      {id: this.state.company.api_id},
      function(data) {
        this.setState({fullCompany: data});
        console.log(data.comps);

        var compData = {};
        $.each(data.comps, function(i, comp) {
          compData[comp] = this.getChartsData(comp, indicators);
        }.bind(this));
        console.log(compData);
        this.setState({compData: compData});
      }.bind(this)
    );
  },
  getChartsData: function(comp, indicator) {
    Dispatcher.apiGet(
      APIEndpoints.FINANCIAL_DATA,
      {id: comp, data_type: indicators.join(',')},
      function(data) {
        return data;
      }.bind(this)
    );
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
    var charts = $.map(this.state.indicators, function(v, k){
      return <DetailChart key={k} data={v} company={CompaniesStore.getState().current} companyData={this.state.companyData} compData={this.state.compData} />
    }.bind(this));

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
