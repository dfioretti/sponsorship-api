var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var CompanyIndex = React.createClass({
  mixins: [ Navigation ],
  setCompany: function(e) {
    CompaniesStore.setCurrent(e.id);
    this.transitionTo('/dashboard/' + e.id);
  },
  renderList: function() {
      var list = $.map(CompaniesStore.getState().companies, function(company){
        var ratio = company.score/5;
        var color = '#' + pickHex('ff0000', 'ffd300', ratio);
        var barStyle = {backgroundColor: color, width: 100 * ratio}
        var colorStyle = {color: color}
        return (
          <tr className="company-cell" key={company.id} onClick={this.setCompany.bind(this, company)}>
            <td>{company.name}</td>
            <td>
              <div className="bkg-bar">
                <div className="fill-bar" style={barStyle}></div>
              </div>
              {company.risk}
            </td>
            <td style={colorStyle}>{company.score}</td>
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
