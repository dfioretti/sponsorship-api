var DashboardHomeStore = Fluxxor.createStore({
  initialize: function() {
    this.dashboards = [];
    this.customDashboards = [];
    this.loaded = false;
    this.currentDashboard = null;
    this.bindActions(
      constants.DASHBOARD_CREATE_SUCCESS, this.onDashboardCreated,
      constants.LOAD_DASHBOARDS, this.onLoadDashboards
    ),
    this.fetchDashboards();
  },
  getDashboard: function(did) {
    this.dashboards.forEach(function(d) {
      if (d.id == did) {
        return d;
      }
    });
  },
  getCustomDashboards: function() {
    this.customDashboards = [];
    this.dashboards.forEach(function(d){
      if (d.kind == 'custom') {
        this.customDashboards.push(d);
      }
    }.bind(this));
    this.emit("change");
  },
  fetchDashboards: function() {
    DashboardClient.getDashboards(function(data) {
      this.dashboards = data;
      this.getCustomDashboards();
      this.loaded = true;
      this.emit("change");
    }.bind(this));
  },
  onLoadDashboards: function() {
    this.fetchDashboards();
    this.emit("change");
  },
  getState: function() {
    return {
      loaded: this.loaded,
      customDashboards: this.customDashboards
    }
  },
  onDashboardCreated: function() {
    this.fetchDashboards();
    this.emit("change");
  },

});

window.DashboardHomeStore = new DashboardHomeStore();
