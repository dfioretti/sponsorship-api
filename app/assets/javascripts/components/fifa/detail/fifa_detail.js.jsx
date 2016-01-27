var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var FifaDetail = React.createClass({
  getInitialState: function() {
    return {loaded: true, orderBy: {field: "model_rank", order: 1}, indicators: []};
  },
  componentWillMount: function() {
    // if (CompaniesStore.getState().ready) {
    //   this.setLoaded();
    // }

    // CompaniesStore.on("update", function() {
    //   this.setLoaded();
    // }.bind(this));
  },
  setupGrid: function() {
    // $('.charts-container').shapeshift({
    //   selector: ".detail-module",
    //   handle: ".drag-handle",
    //   align: "left",
    //   autoHeight: false,
    //   gutterX: 20,
    //   gutterY: 20,
    //   paddingX: 20,
    //   paddingY: 20
    // });
  },
  setLoaded: function() {
    // CompaniesStore.setCurrent(this.props.params.id);
    // this.setState({loaded: true, company: CompaniesStore.getState().current}, function() {
    //   this.getRiskIndicators();
    // }.bind(this));
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
  getSubNavTitle: function () {
    var titles = {
      global_issues: "Top Global Issues"
    };

    return titles[this.props.params.detail_type];
  },
  order: function(value, e) {
    $('.details-subnav .filter').removeClass('asc');
    switch (value) {
      case 0:
        var order = 1;
        if (this.state.orderBy.field == "model_rank" && this.state.orderBy.order == 1) {
          order = 0;
          $(e.target).closest('.filter').addClass('asc');
        }
        this.setState({orderBy: {field: "model_rank", order: order}});
        break;
      case 1:
        var order = 1;
        if (this.state.orderBy.field == "importance" && this.state.orderBy.order == 1) {
          order = 0;
          $(e.target).closest('.filter').addClass('asc');
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
    var link = '/fifa/dashboard';

    return (
      <div className="details-subnav">
        <div className="details-left-nav">
          <Link to={link}><div className="back-icon"></div></Link>
          <div className="to-dashboard">{this.getSubNavTitle()}</div>
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
    console.log(this.props.params)

    if (this.state.loaded) {
      return (
        <div className="company-detail fifa-detail">
          <Sidebar {...this.props} dashboardType="fifa" minimal />
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
