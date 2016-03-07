var actions = {
  // ComponentEditorActions
  updateTitle: function(title) {
    this.dispatch(constants.UPDATE_TITLE, { title: title });
  },
  updateType: function(chartType) {
    this.dispatch(constants.UPDATE_TYPE, { chartType: chartType });
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
  newComponent: function() {
    this.dispatch(constants.NEW_COMPONENT);
  }
};
