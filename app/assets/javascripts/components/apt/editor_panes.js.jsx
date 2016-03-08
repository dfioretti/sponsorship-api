var GeneralPane = React.createClass({
  mixins: [FluxMixin],
  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },
  handleTitleChange: function(e) {
    this.getFlux().actions.updateTitle(e.target.value);
  },
  render: function() {
    return (
      <div className="editor-pane">
        <div className="input-heading">
          General
        </div>
        <div className="form-content">
          <div className="form-group">
            <label>Component Title</label>
            <input type="text" value={this.getStateFromFlux().title} onChange={this.handleTitleChange} className="form-control" placeholder="Enter Title" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea></textarea>
          </div>
        </div>
      </div>
    );
  }
});

var ChartTypePane = React.createClass({
  mixins: [FluxMixin],

  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },
  handleChartTypeChange: function(e) {
    this.getFlux().actions.updateType(e.target.value);
  },
  render: function() {
    var chartTypes = [{id: 'lineChart', name: 'Line Chart'},
                      {id: 'barChart', name: "Bar Chart"},
                      {id: 'pieChart', name: "Pie Chart"},
                      {id: 'doughnutChart', name: "Doughnut Chart"},
                      {id: 'dataList', name: "Data List"},
                    ];
    var typeList = [];
    chartTypes.map(function(item) {
      typeList.push(<option value={item.id}>{item.name}</option>);
    }.bind(this));
    return (
      <div className="editor-pane">
        <div className="input-heading">
          Chart Type
        </div>
        <div className="form-content">
          <div className="form-group">
            <label>Chart Type &nbsp;&nbsp;&nbsp;</label>
            <select onChange={this.handleChartTypeChange} value={this.getStateFromFlux().chartType}>
              {typeList}
            </select>
          </div>
          <div className="form-group">
            <img src="/edit/chart.png" />
          </div>
        </div>
      </div>
    );
  }
});
var AssetSearch = React.createClass({
  mixins: [FluxMixin],

  componentDidMount: function() {
    flux.store("ComponentEditorStore").loadData();
  },
  getState: function() {
    return {};
  },
  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },
  handleFilterChange: function(e) {
    this.getFlux().actions.filterList(e.target.value);
  },
  getList: function() {
    var list = [];
    var imgStyle = {
      height: "50px",
      width: "50px",
      borderRadius: "50%",
      marginLeft: "0px"
    };
    this.getStateFromFlux().filteredList.map(function(item) {
      var image = "/images/" + item.id + ".jpg";
      list.push(
        <div className="container filter-content">
          <div id={item.id} className="row filter-row">
            <div id={item.id} style={{paddingTop: "10px"}} className="col-md-3 filter-row">
              <img style={imgStyle} src={image} />
            </div>
            <div id={item.id} style={{height: "50px", paddingTop: "20px"}} className="col-md-5 filter-row">
              {item.name}
            </div>
          </div>
        </div>);
    }.bind(this));
    return list;
  },
  render: function() {
    var list = this.getList();
    return (
      <div className="asset-search">
        <div className="form-group">
          <input placeholder="Filter asset list" type="text" className="form-control" value={this.getStateFromFlux().filterText} onChange={this.handleFilterChange} />
        </div>
        <ul onClick={this.handleAssetSelect} className="filter-list">
          {list}
        </ul>
      </div>
    );
  },
  handleAssetSelect: function(e) {
    this.getFlux().actions.selectedAsset(e.target.id);
  }
});
var DataListForSelected = React.createClass({
  mixins: [FluxMixin],

  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },
  formatData: function(point) {
    return point.split("_").join(" ");
    //var newString = point.split("_").join(" ");
    //return newString.charAt(0).toUpperCase() + newString.slice(1);
  },
  getDataPointList: function() {
    var list = [];
    var imgStyle = {
      height: "50px",
      width: "50px",
      borderRadius: "50%",
      marginLeft: "0px"
    };
    this.getStateFromFlux().filteredDataPointList.map(function(item) {
      var image = "/icons-blue/0.png";
      var name = this.formatData(item.point);
      list.push(
        <div className="container filter-content">
          <div id={item.id} className="row filter-row">
            <div id={item.id} style={{paddingTop: "10px"}} className="col-md-3 filter-row">
              <img style={imgStyle} src={image} />
            </div>
            <div id={item.id} style={{height: "50px", paddingTop: "20px;"}} className="col-md-5 filter-row data-item">
              {name}
            </div>
          </div>
        </div>);
    }.bind(this));

    return list;
  },

  handleDataSelect: function(e) {
    this.getFlux().actions.dataSelected(e.target.id);
  },
  handleDataFilterChange: function(e) {
    this.getFlux().actions.filterData(e.target.value);
  },
  render: function() {
    if (this.getStateFromFlux().selectedAsset === null) {
      return null;
    } else {
      var dataPointList = this.getDataPointList();
      return (
        <div>
          <label>Select Data</label><br />
          <input type="text" placeholder="Filter avilable data" className="form-control" value={this.getStateFromFlux().dataFilterText} onChange={this.handleDataFilterChange} />
          <ul className="filter-list" onClick={this.handleDataSelect} >
            {dataPointList}
          </ul>
        </div>
      );
    }
  }
});

var DataPane = React.createClass({
  mixins: [FluxMixin],

  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },

  renderSelectedAsset: function() {
    var selected = this.getStateFromFlux().selectedAsset;
    if (selected === null) return null;
    return (
      <div className="form-group">
        <label>Asset</label>&nbsp;&nbsp;&nbsp;
        <strong>{selected.name}</strong>
      </div>
    );
  },
  renderSelectedData: function() {
    var selected = this.getStateFromFlux().selectedData;
    if (selected === null) return null;
    return (
      <div className="form-group">
        <label>Data</label>&nbsp;&nbsp;&nbsp;
        <strong>{selected.name}</strong>
      </div>
    );
  },
  render: function() {
    return (
      <div className="editor-pane">
        <div className="input-heading">
          Data
        </div>
        <div className="form-content">
          <div className="form-group">
            <label>Select Asset</label>
            <AssetSearch />
          </div>
            {this.renderSelectedAsset()}
          <div className="form-group">
            <DataListForSelected />
          </div>
            {this.renderSelectedData()}
          <div className="form-group">
            <AddDataButton />
          </div>
        </div>
      </div>
    );
  }

});
var AddDataButton = React.createClass({
  mixins: [FluxMixin],
  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },
  handleAddData: function(e) {
    this.getFlux().actions.addData();
  },
  render: function() {
    if (this.getStateFromFlux().selectedData !== null) {
      return (
        <button onClick={this.handleAddData} className="btn btn-primary editor-button">
          Add Data
        </button>
      );
    } else {
      return null;
    }
  }
});

var AppearancePane = React.createClass({
  mixins: [FluxMixin],
  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },
  render: function() {
    return (
      <div className="editor-pane">
        <div className="input-heading">
          Appearance
        </div>
        <div className="form-content">
          <div className="form-group">
            <label>Appearance Unavailable</label>
          </div>
        </div>
      </div>
    );
  }
});
var ConfigurationPane = React.createClass({
  mixins: [FluxMixin],
  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },
  render: function() {
    return (
      <div className="editor-pane">
        <div className="input-heading">
          Configuration
        </div>
        <div className="form-content">
          <div className="form-group">
            <label>Configuration Unavailable</label>
          </div>
        </div>
      </div>
    );
  }
});
