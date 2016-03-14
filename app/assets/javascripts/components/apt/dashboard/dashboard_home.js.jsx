var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var DashboardHome = React.createClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin("DashboardHomeStore")
  ],
  setupGrid: function() {
    $('.modules-container').shapeshift({
      selector: ".dashboard-module",
      handle: ".drag-handle",
      align: "left",
      minColumns: 2,
      autoHeight: false,
      gutterX: 20,
      gutterY: 20,
      paddingX: 20,
      paddingY: 20
    });

/*
    $('.modules-container').on('ss-drop-complete', function(e, selected) {
      //this.updateDashboardState(this.getDashboardState());
    }.bind(this));
*/
  },
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
  componentWillUpdate: function() {
    this.setupGrid();
  },
  componentDidUpdate: function() {
    this.setupGrid();
  },
  mapModule: function(name, state) {
    if (name.indexOf('custom_component') > -1) {
      var component = this.getComponentFromFlux(parseInt(name.split("_").pop(-1)));
      el = <DynamicComponent key={component.id} component={component} />
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
