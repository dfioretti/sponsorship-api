var actions = {
  // ComponentEditorActions
  updateTitle: function(title) {
    this.dispatch(constants.UPDATE_TITLE, { title: title });
  },
  updateType: function(view) {
    this.dispatch(constants.UPDATE_TYPE, { view: view });
  },
  changePane: function(pane) {
    this.dispatch(constants.CHANGE_PANE, { editorPane: pane});
  },
  filterList: function(filterText) {
    this.dispatch(constants.FILTER_LIST, { filterText: filterText});
  },
  filterData: function(filterText) {
    this.dispatch(constants.FILTER_DATA, { filterText: filterText});
  },
  selectedAsset: function(selectedAsset) {
    this.dispatch(constants.ASSET_SELECT, { selectedAsset: selectedAsset});
  },
  dataSelected: function(selectedData) {
    this.dispatch(constants.DATA_SELECT, { selectedData: selectedData});
  },
  addData: function() {
    this.dispatch(constants.ADD_DATA);
  },
  removeData: function(index) {
    this.dispatch(constants.REMOVE_DATA, { index: index });
  },
  saveComponent: function() {
    this.dispatch(constants.SAVE_COMPONENT);
    ComponentClient.createComponent(flux.store("ComponentEditorStore").getObject(), function(data) {
      this.dispatch(constants.SAVE_SUCCESS, { component: data });
    }.bind(this), function(error) {
      this.dispatch(constants.SAVE_FAIL);
    }.bind(this));
  },
  updateComponent: function() {
    this.dispatch(constants.UPDATE_COMPONENT);
    ComponentClient.updateComponent(flux.store("ComponentEditorStore").getObject(), function(data) {
      this.dispatch(constants.UPDATE_SUCCESS, { component: data });
    }.bind(this), function(error) {
      this.dispatch(constants.UPDATE_FAIL);
    }.bind(this))
  },
  loadComponentUpdate: function(component) {
    this.dispatch(constants.LOAD_COMPONENT_UPDATE, { component: component});
  },
  newComponent: function() {
    this.dispatch(constants.NEW_COMPONENT);
  },
  generatePreviewData: function() {
    this.dispatch(constants.PREVIEW_DATA);
    ComponentClient.generatePreviewData(flux.store("ComponentEditorStore").getObject(), function(data) {
      this.dispatch(constants.PREVIEW_SUCCESS, { component: data });
    }.bind(this), function(error) {
      this.dispatch(constants.PREVIEW_FAIL);
    }.bind(this));
  },


  // dashboard create actions
  updateDashboardName: function(name) {
    this.dispatch(constants.UPDATE_DASHBOARD_NAME, { name: name});
  },
  removeDashboardComponent: function(component_id) {
    this.dispatch(constants.DASHBOARD_ITEM_REMOVED, { component_id: component_id});
  },
  addDashboardComponent: function(component_id) {
    this.dispatch(constants.DASHBOARD_ITEM_ADDED, { component_id: component_id});
  },
  dashboardCreate: function() {
    this.dispatch(constants.DASHBOARD_CREATE);
    DashboardClient.createDashboard(flux.store("DashboardCreateStore").getObject(), function(data) {
      this.dispatch(constants.DASHBOARD_CREATE_SUCCESS, { dashboard: data });
    }.bind(this), function(error) {
      this.dispatch(constants.DASHBOARD_CREATE_FAIL);
    }.bind(this));
  },
  loadDashboards: function() {
    this.dispatch(constants.LOAD_DASHBOARDS);
  }
};
