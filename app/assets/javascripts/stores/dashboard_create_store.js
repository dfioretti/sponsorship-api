var DashboardCreateStore = Fluxxor.createStore({
  initialize: function() {
    this.availableComponents = [];
    this.fetchComponents();
    this.dashboardName = "";
    this.selectedComponents = [];
    this.bindActions(
      constants.UPDATE_DASHBOARD_NAME, this.onUpdateName,
      constants.DASHBOARD_ITEM_ADDED, this.onItemAdded,
      constants.DASHBOARD_ITEM_REMOVED, this.onItemRemoved
    )
  },
  isComponentSelected: function(component_id) {
    return (this.selectedComponents.indexOf(component_id) !== -1);
  },
  onItemAdded: function(payload) {
    console.log("ADDD");
    console.log(payload)
    this.selectedComponents.push(payload.component_id);
    this.emit("change");
  },
  onItemRemoved: function(payload) {
    console.log("RMMM");
    console.log(payload)
    var index = this.selectedComponents.indexOf(payload.component_id);
    this.selectedComponents = this.selectedComponents.splice(index, 1);
    this.emit("change");
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
