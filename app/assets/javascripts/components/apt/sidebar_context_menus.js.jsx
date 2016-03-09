var RouteHandler = ReactRouter.RouteHandler,
  Link = ReactRouter.Link;


var DashboardContextMenu = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DashboardHomeStore")],
  componentWillMount: function() {
    if (!this.getStateFromFlux().loaded) {
      this.getFlux().actions.loadDashboards();
    }
  },

  getInitialState: function() {
    return {};
  },
  getStateFromFlux: function() {
    return this.getFlux().store("DashboardHomeStore").getState();
  },

  render: function() {
    /*
    <div className="context-heading">
    </div>
    */
    if (this.getStateFromFlux().loaded) {
      return (
        <div className="editor-menu">
          <ul>
           {this.getStateFromFlux().customDashboards.map(function(d) {
             var link = "apt/dashboard/" + d.id;
             return (
              <Link key={d.id} to={link}>
                <li>
                  {d.name}
                </li>
              </Link>
             );
           })}
         </ul>
       </div>
      );
    } else {
      return (
        <div className="dashboard-context-menu">
        </div>
      );
    }
  }
});
