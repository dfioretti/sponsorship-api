var constants = {
  UPDATE_TYPE: "UPDATE_TYPE",
  UPDATE_TITLE: "UPDATE_TITLE",
  ADD_DATA: "ADD_DATA",
  CHANGE_PANE: "CHANGE_PANE",
  FILTER_LIST: "FILTER_LIST",
  FILTER_DATA: "FILTER_DATA",
  ASSET_SELECT: "ASSET_SELECT",
  DATA_SELECT: "DATA_SELECT",
  REMOVE_DATA: "REMOVE_DATA",
  SAVE_COMPONENT: "SAVE_COMPONENT"
};


var ComponentStore = Fluxxor.createStore({

  initialize: function() {
    this.title = "New Component";
    this.chartType = "lineChart";
    this.editorPane = "general";
    this.selectedAsset = null;
    this.selectedData = null;
    this.startList = [];
    this.data = [];
    this.dataIndex = 0;
    this.filteredList = [];
    this.dataPointList= [];
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
      constants.SAVE_COMPONENT, this.onSaveComponent
    )
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
    var c = new Object( {
        id: 9,
        name: "UPDATED",
        view: "lineChart",
        model: {
          title: "Test Title",
          type: "lineChart",
          interval: "weekly",
          data: [
            {
              entity: "asset",
              entity_id: 943,
              source: "twitter",
              source_id: 432
              point: "facebook_fans",
              point_id: 343
            },
            {
              entity: "asset",
              entity_id: 853,
              source: "twitter",
              source_id: 212
            }
          ]
        }
    });
    ComponentClient.updateComponent(c, function(data) {
      alert(data);
      console.log(data);
    });
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
    //this.filterText = "";
    //this.filteredList = [];
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
    console.log("on sel" + this.findSelectedData(payload.selectedData));
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
      title: this.title,
      chartType: this.chartType,
      editorPane: this.editorPane,
      filterText: this.filterText,
      filteredList: this.filteredList,
      selectedAsset: this.selectedAsset,
      selectedData: this.selectedData,
      dataPointList: this.dataPointList,
      filteredDataPointList: this.filteredDataPointList,
      data: this.data
    };
  }
});

var actions = {
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
  }

};

var stores = {
  ComponentStore: new ComponentStore()
};
