var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var DashboardHome = React.createClass({
  mixins: [
    DashboardMixin,
    FluxMixin,
    StoreWatchMixin("DashboardHomeStore")
  ],
  getInitialState: function() {
    return {};
  },
  getStateFromFlux: function() {
    return flux.store("DashboardHomeStore").getDashboard(this.props.params.id);
  },
  getComponentFromFlux: function(cid) {
    return flux.store("ComponentsStore").getComponent(cid);
  },
  componentWillMount: function() {
    this.props.setTitle('apt');
  },
  componentWillReceiveProps: function(newProps) {
    this.setupGrid();
  },
  mapModule: function(name, state) {
    if (name.indexOf('custom_component') > -1) {
      var component = this.getComponentFromFlux(parseInt(name.split("_").pop(-1)));
      el = <DynamicComponent component={component} />
    }
    return el;
  },
  renderModules: function(dashboardState) {
    var modules = $.map(dashboardState, function(v, k){
      return this.mapModule(k, v.toggle);
    }.bind(this));

    return (
      <div className="modules-container">
        {modules}
      </div>
    );
  },
  render: function() {
      return (
        <div className="dashboard">
          <AppSidebar view="dashboard" />
          <div className="modules-box">
            {this.renderModules(this.getStateFromFlux().state)}
          </div>
        </div>
      );
  }
});
