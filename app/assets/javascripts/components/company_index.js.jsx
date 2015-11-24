var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var CompanyIndex = React.createClass({
  mixins: [ Navigation ],
  componentWillMount: function() {
    this.props.setTitle('');
  },
  setCompany: function(e) {
    CompaniesStore.setCurrent(e.id);
    this.transitionTo('/dashboard/' + e.id);
  },
  renderList: function() {
      var list = $.map(CompaniesStore.getState().companies, function(company){
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
                <th><a href="#">Company (Ticker)<span className="caret"></span></a></th>
                <th><a href="#">Risk Score<span className="caret"></span></a></th>
                <th><a href="#">Gov. Score<span className="caret"></span></a></th>
              </tr>
            </thead>
            {this.renderList()}
          </table>
        </div>
      </div>
    );
  }
});
