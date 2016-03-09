var DashboardCreateStore = Fluxxor.createStore({
  initialize: function() {
    this.availableComponents = [];
    this.fetchComponents();
    this.dashboardName = "";
    this.selectedComponents = [];
    this.bindActions(
      constants.UPDATE_DASHBOARD_NAME, this.onUpdateName,
      constants.DASHBOARD_ITEM_ADDED, this.onItemAdded,
      constants.DASHBOARD_ITEM_REMOVED, this.onItemRemoved,
      constants.DASHBOARD_CREATE, this.onDashboardCreate,
      constants.DASHBOARD_CREATE_FAIL, this.onDashboardCreateFail,
      constants.DASHBOARD_CREATE_SUCCESS, this.onDashboardCreateSuccess
    )
  },
  isComponentSelected: function(component_id) {
    return (this.selectedComponents.indexOf(component_id) !== -1);
  },
  onItemAdded: function(payload) {
    this.selectedComponents.push(payload.component_id);
    this.emit("change");
    this.emit("change");
  },
  onItemRemoved: function(payload) {
    this.selectedComponents.splice(this.selectedComponents.indexOf(payload.component_id), 1);
    this.emit("change");
  },
  onDashboardCreate: function() {
  },
  onDashboardCreateFail: function() {
    console.log("failed dashboard create");
  },
  onDashboardCreateSuccess: function() {
    this.emit("change");
  },
  getObject: function() {
    return {
      company_id: 9999,
      state: this.getDashboardState(),
      kind: "custom",
      item_id: -1
    };
  },
  getDashboardState: function() {
    var i = 0;
    state = {};
    this.selectedComponents.forEach(function(c){
      state["custom_component_" + c] = { index: i, toggle: "on"}
      i++;
    });
    return state;
  },
  onUpdateName: function(payload) {
    this.dashboardName = payload.name;
    this.emit("change");
  },
  fetchComponents: function() {
    ComponentClient.getComponents(function(data) {
      this.availableComponents = data;
      this.emit("change");
    }.bind(this));
  },
  getState: function() {
    return {
      availableComponents: this.availableComponents,
      dashboardName: this.dashboardName,
      selectedComponents: this.selectedComponents
    };
  }

});

window.DashboardCreateStore = new DashboardCreateStore();
