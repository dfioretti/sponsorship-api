var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var CompanyIndex = React.createClass({
  mixins: [ Navigation ],
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
            <tbody>
              <tr className="company-cell">
                <td>Ford Motor Company (F)</td>
                <td><div></div>High</td>
                <td>3.6</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
