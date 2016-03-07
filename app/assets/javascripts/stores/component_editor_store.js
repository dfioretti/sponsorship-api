var ComponentEditorStore = Fluxxor.createStore({

  initialize: function() {
    // component object
    this.id = null;
    this.title = "New Component";
    this.data = [];
    this.chartType = "lineChart";
    this.interval = "weekly";

    // ui data
    this.editorPane = "general";
    this.message = "";
    this.selectedAsset = null;
    this.selectedData = null;
    this.error = null;
    this.loading = false;
    this.saving = false;
    this.startList = [];
    this.dataIndex = 0;
    this.filteredList = [];
    this.dataPointList = [];
    DataClient.getData(function(data) {
        this.dataPointList = data;
    }.bind(this));
    this.filteredDataPointList = [];
    this.filterText = "";
    this.dataFilterText = "";
    this.bindActions(
      constants.UPDATE_TYPE, this.onUpdateType,
      constants.ADD_DATA, this.onDataAdded,
      constants.UPDATE_TITLE, this.onUpdateTitle,
      constants.CHANGE_PANE, this.onChangePane,
      constants.FILTER_LIST, this.onFilterList,
      constants.FILTER_DATA, this.onFilterData,
      constants.ASSET_SELECT, this.onAssetSelected,
      constants.DATA_SELECT, this.onDataSelected,
      constants.REMOVE_DATA, this.onDataRemoved,
      constants.SAVE_COMPONENT, this.onSaveComponent,
      constants.SAVE_SUCCESS, this.onSaveSuccess,
      constants.SAVE_FAIL, this.onSaveFail,
      constants.UPDATE_COMPONENT, this.onUpdateComponent,
      constants.UPDATE_SUCCESS, this.onUpdateSuccess,
      constants.UPDATE_FAIL, this.onUpdateFail,
      constants.NEW_COMPONENT, this.onNewComponent
    )
  },
  getObject: function() {
    return {
      id: this.id,
      name: this.title,
      view: this.chartType,
      interval: this.interval,
      model: {
        title: this.title,
        type: this.chartType,
        interval: this.interval,
        data: this.data
      }
    };
  },
  loadData: function() {
    this.startList = AssetsStore.getState().assets;
    this.filteredList = this.startList;
  },
  onChangePane: function(payload) {
    this.editorPane = payload.editorPane;
    this.emit("change");
  },
  onUpdateType: function(payload) {
    this.chartType = payload.chartType;
    this.emit("change");
  },
  onUpdateTitle: function(payload) {
    this.title = payload.title;
    this.emit("change");
  },
  onSaveComponent: function() {
    this.saving = true;
    this.emit("change");
  },
  onSaveSuccess: function(payload) {
    this.id = payload.component.id;
    this.saving = false;
    this.message = "Component saved!";
    this.emit("change");
  },
  onSaveFail: function(error) {
    this.message = "Failed saving component!";
    this.emit("change");
  },
  onUpdateComponent: function() {
    this.saving = true;
    this.emit("change");
  },
  onUpdateSuccess: function(payload) {
    this.message = "Component saved!";
    this.id = payload.component.id;
    this.saving = false;
    this.emit("change");
  },
  onUpdateFail: function(error) {
    this.message = "Failed saviing component";
    this.emit("change");
  },
  onDataAdded: function(payload) {
    this.data.push({index: this.dataIndex,
                    source: this.selectedAsset,
                    point: this.selectedData
    });
    this.dataIndex++;
    this.selectedData = null;
    this.selectedAsset = null;
    this.filteredList = [];//= this.startList;
    this.filteredDataPointList = this.dataPointList;
    this.filterText = "";
    this.dataFilterText = "";
    this.emit("change");
  },
  onDataRemoved: function(payload) {
    console.log(payload);
    var i = 0;
    for (i; i < this.data.length; i++) {
      console.log(this.data[i].index);
      if (this.data[i].index === parseInt(payload.index))
        break;
    }
    var index = this.data.indexOf(i);
    this.data.splice(index, 1);
    this.emit("change");
  },
  onAssetSelected: function(payload) {
    if (payload.selectedAsset === null || payload.selectedAsset.length < 1)
      return;
    this.selectedAsset = AssetsStore.find(payload.selectedAsset);

    // hacky setup until i load data into db
    this.dataPointList = [];
    var tf = new Object();
    tf.id = 1;
    tf.name = "Twitter Followers";
    var ff = new Object();
    ff.id = 2;
    ff.name = "Facebook Fans";
    var ig = new Object();
    ig.id = 3;
    ig.name = "Instagram Followers";
    var gp = new Object();
    gp.id = 4;
    gp.name = "Google+ Followers";
    this.dataPointList.push(ff);
    this.dataPointList.push(tf);
    this.dataPointList.push(ig);
    this.dataPointList.push(gp);
    this.filteredDataPointList = this.dataPointList;
    this.emit("change");
  },
  onNewComponent: function() {
    this.id = null;
    this.title = "";
    this.chartType = 'lineChart';
    this.data = [];
    this.interval = "weekly";
    this.message = "New Component";
    this.emit("change");
  },
  findSelectedData: function(id) {
    for (var i = 0; i < this.dataPointList.length; i++) {
      if (parseInt(id) === this.dataPointList[i].id) {
        return this.dataPointList[i];
      }
    }
  },
  onDataSelected: function(payload) {
    if (payload.selectedData === null || payload.selectedData.length < 1)
      return;
    this.selectedData = this.findSelectedData(payload.selectedData);
    this.emit("change");
  },
  onFilterData: function(payload) {
    this.dataFilterText = payload.filterText;
    var filteredList = [];
    this.dataPointList.forEach(function(item) {
      if (item['name'].toLowerCase().indexOf(this.dataFilterText) === -1) {
        return;
      } else {
        filteredList.push(item);
      }
    }.bind(this));
    this.filteredDataPointList = filteredList;
    this.emit("change");
  },
  onFilterList: function(payload) {
    this.filterText = payload.filterText;
    var filteredList = [];
    this.startList.forEach(function(li) {
      if (li['name'].toLowerCase().indexOf(this.filterText) === -1) {
        return;
      } else {
        filteredList.push(li);
      }
    }.bind(this));
    this.filteredList = filteredList;
    this.emit("change");
  },
  getState: function() {
    return {
      id: this.id,
      title: this.title,
      chartType: this.chartType,
      editorPane: this.editorPane,
      filterText: this.filterText,
      filteredList: this.filteredList,
      selectedAsset: this.selectedAsset,
      selectedData: this.selectedData,
      dataPointList: this.dataPointList,
      filteredDataPointList: this.filteredDataPointList,
      message: this.message,
      data: this.data
    };
  }
});
