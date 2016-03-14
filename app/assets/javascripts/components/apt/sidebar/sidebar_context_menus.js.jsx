var RouteHandler = ReactRouter.RouteHandler,
  Link = ReactRouter.Link;


var DashboardContextMenu = React.createClass({
  mixins: [FluxMixin, Navigation, StoreWatchMixin("DashboardHomeStore")],
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
  /**
   * Handles dashboard dropdown selected.
   *
   * @param {e} item click event
   */
  handleMenuSelect: function(e) {
    if (e.target.dataset.action === 'view') {
      this.transitionTo('/apt/dashboard/' + e.target.id);
    } else {
      // set DashboardEditStore state for current dashboard
      //this.getFlux().actions.dashboardEditLoad(e.target.id);
      $('#edit-modal-' + e.target.id).click();
    }
  },
  render: function() {
    if (this.getStateFromFlux().loaded) {
      return (
        <div className="editor-menu">
          <ReactBootstrap.NavDropdown style={{width: "100%"}}eventKey={1} title="Dashboards" id="dashbard-nav-dropdown">
           {this.getStateFromFlux().customDashboards.map(function(d) {
             var modalId = "edit-modal-" + d.id;
             return (
               <div className="dropdown-item-wrapper">
                 <ReactBootstrap.MenuItem
                   onSelect={ function(e) { this.handleMenuSelect(e); }.bind(this) }
                   style={{padding: "5px 0px 5px 0px"}}
                   key={d.id}
                 >
                   <div key={'row' + d.id} className="row">
                     <div data-action="view" id={d.id} className="col-md-9 bs-col navdrop">
                       {d.name}
                     </div>
                     <div className="col-md-1 bs-col navdrop">
                       <span data-action="edit" id={d.id} className="glyphicon glyphicon-cog" aria-hidden="true"></span>
                     </div>
                   </div>
                 </ReactBootstrap.MenuItem>
                 <CreateDashboardModal key={"modal-" + d.id} id={modalId} dashboardId={d.id} mode='edit' hideTrigger={true} />
               </div>
             );
           }.bind(this))}
         </ReactBootstrap.NavDropdown>
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
