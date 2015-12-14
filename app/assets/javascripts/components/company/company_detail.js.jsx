var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var CompanyDetail = React.createClass({
  getInitialState: function() {
    return {loaded: false, orderBy: {field: "data_type_display_name", order: 0}, indicators: []};
  },
  componentWillMount: function() {
    if (CompaniesStore.getState().ready) {
      this.setLoaded();
    }

    CompaniesStore.on("update", function() {
      this.setLoaded();
    }.bind(this));
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
    Dispatcher.apiGet(
      APIEndpoints.RISK_INDICATORS,
      {id: this.state.company.api_id},
      function(data) {
        this.setState({indicators: data}, function() {
          this.setupGrid();
        }.bind(this));

        var data_types = $.map(data, function(indicator) {
          return indicator.data_type
        });

        this.getCompanyData(data_types);
        this.getComps(data_types);
      }.bind(this)
    );
  },
  getCompanyData: function(indicators) {
    Dispatcher.apiGet(
      APIEndpoints.FINANCIAL_DATA,
      {id: this.state.company.api_id, data_type: indicators.join(',')},
      function(data) {
        this.setState({companyData: data});
      }.bind(this)
    );
  },
  getComps: function(indicators) {
    var self = this;
    Dispatcher.apiGet(
      APIEndpoints.COMPANY,
      {id: self.state.company.api_id},
      function(data) {
        self.setState({fullCompany: data});

        var compData = {};
        $.each(data.comps, function(i, comp) {
          self.getChartsData(comp, indicators).then(function(data) {
            compData[comp] = data;
          });
        });

        $(document).ajaxStop(function() {
          $(this).unbind("ajaxStop");
          self.setState({compData: compData});
        });
      }
    );
  },
  getChartsData: function(comp, indicators) {
    var p = $.Deferred();

    Dispatcher.apiGet(
      APIEndpoints.FINANCIAL_DATA,
      {id: comp, data_type: indicators.join(',')},
      function(data) {
        p.resolve(data);
      }.bind(this)
    );

    return p;
  },
  order: function(value) {
    switch (value) {
      case 0:
        var order = 0;
        if (this.state.orderBy.field == "data_type_display_name" && this.state.orderBy.order == 0) {
          order = 1;
        }
        this.setState({orderBy: {field: "data_type_display_name", order: order}});
        break;
      case 1:
        var order = 0;
        if (this.state.orderBy.field == "importance" && this.state.orderBy.order == 0) {
          order = 1;
        }
        this.setState({orderBy: {field: "importance", order: order}});
        break;
    }

    var indicators = this.state.indicators;

    if (this.state.orderBy) {
      indicators.sort(function(i1, i2){
        var order;
        var field1 = i1[this.state.orderBy.field];
        var field2 = i2[this.state.orderBy.field];

        if (typeof(field1) === 'string') {
          field1 = field1.toUpperCase();
        }
        if (typeof(field2) === 'string') {
          field1 = field1.toUpperCase();
        }

        if (this.state.orderBy.order == 0) {
          order = field1 > field2 ? 1 : -1
        } else {
          order = field1 < field2 ? 1 : -1
        }

        return order;
      }.bind(this));
    }

    var newDom = $.map(indicators, function(indicator) {
      return ReactDOM.findDOMNode(this.refs[indicator.data_type]);
    }.bind(this));

    $('.charts-container').html(newDom);
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
            <div className="filter value-filter" onClick={this.order.bind(this, 0)}>Filter by Value <span className="caret"></span></div>
            <div className="filter severity-filter" onClick={this.order.bind(this, 1)}>Filter by Severity <span className="caret"></span></div>
          </div>
        </div>
      </div>
    );
  },
  renderCharts: function() {
    var indicators = this.state.indicators;

    var charts = $.map(indicators, function(v, k){
      return <DetailChart
        ref={v.data_type}
        key={k}
        data={v}
        fullCompany={this.state.fullCompany}
        company={CompaniesStore.getState().current}
        companyData={this.state.companyData}
        compData={this.state.compData} />
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
