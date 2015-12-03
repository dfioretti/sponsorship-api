var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var CompanyIndex = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    return {orderBy: {field: "name", order: 0}};
  },
  componentWillMount: function() {
    this.props.setTitle('');
  },
  setCompany: function(e) {
    CompaniesStore.setCurrent(e.id);
    this.transitionTo('/dashboard/' + e.id);
  },
  order: function(value) {
    switch (value) {
      case 0:
        var order = 0;
        if (this.state.orderBy.field == "name" && this.state.orderBy.order == 0) {
          order = 1;
        }
        this.setState({orderBy: {field: "name", order: order}});
        break;
      case 1:
        var order = 0;
        if (this.state.orderBy.field == "risk" && this.state.orderBy.order == 0) {
          order = 1;
        }
        this.setState({orderBy: {field: "risk", order: order}});
        break;
      case 2:
        var order = 0;
        if (this.state.orderBy.field == "risk" && this.state.orderBy.order == 0) {
          order = 1;
        }
        this.setState({orderBy: {field: "risk", order: order}});
        break;
    }
  },
  renderList: function() {
    var companies = CompaniesStore.getState().companies;
    if (this.state.orderBy) {
      companies.sort(function(c1, c2){
        var order;

        if (this.state.orderBy.order == 0) {
          order = c1[this.state.orderBy.field] > c2[this.state.orderBy.field]
        } else {
          order = c1[this.state.orderBy.field] < c2[this.state.orderBy.field]
        }

        return order;
      }.bind(this));
    }

    var list = $.map(companies, function(company){
      var ratio = company.risk/1;
      var color = riskColor(ratio);
      var barStyle = {backgroundColor: color, width: 100 * ratio}
      var colorStyle = {color: color}
      return (
        <tr className="company-cell" key={company.id} onClick={this.setCompany.bind(this, company)}>
          <td>{company.name} ({company.ticker})</td>
          <td>
            <div className="bkg-bar">
              <div className="fill-bar" style={barStyle}></div>
            </div>
            {riskLabel(company.risk)}
          </td>
          <td style={colorStyle}>{company.risk}</td>
        </tr>
      );
    }.bind(this));
    return (
      <tbody>
        {list}
      </tbody>
    );
  },
  render: function() {
    return (
      <div className="centered company-index">
        <div className="top">
          <p className="top-title">Choose Company</p>
        </div>
        <div className="company-index-table">
          <table>
            <thead>
              <tr>
                <th><a href="#" onClick={this.order.bind(this, 0)}>Company (Ticker)<span className="caret"></span></a></th>
                <th><a href="#" onClick={this.order.bind(this, 1)}>Risk Score<span className="caret"></span></a></th>
                <th><a href="#" onClick={this.order.bind(this, 2)}>Gov. Score<span className="caret"></span></a></th>
              </tr>
            </thead>
            {this.renderList()}
          </table>
        </div>
      </div>
    );
  }
});
