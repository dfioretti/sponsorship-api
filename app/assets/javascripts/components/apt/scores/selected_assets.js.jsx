var SelectedAssets = React.createClass({
  removeSelected: function() {
    var selected = $('.asset-selected', "#selected-table");
    for (var i = 0; i < selected.length; i++) {
      var tr = selected[i];
      AssetTableSelect.addAsset($(tr).data('id'));
      $('#selected-table').DataTable().row(tr).remove().draw(false);
    }

  },
  componentDidMount: function() {
    $('#selected-table').DataTable(
      {
        "bPaginate": false,
        "bInfo" : false,
        "oLanguage" : {
          "sSearch" : "",
        },
        "bFilter" : false,
        "scrollY" : "400px",
        "paging" : false,
        "scrollCollapse" : false
      }
    );
    $('#selected-table tbody').on('click', 'tr', function() {
      $(this).toggleClass('asset-selected');
    });
  },
  saveSet: function() {
    console.log("TODO - save set");
  },
  componentWillMount: function() {
    AssetsStore.setCurrent();

    AssetsStore.on("update", function() {
      this.setState({loaded: true});
    }.bind(this));
  },
  render: function() {
    var overrideStyle = {};
    var iconStyle = {
      fontSize: "20px",
    };

    var buttonStyle = {
      width: "130px",
      height: "30px",
      marginTop: "10px",
      fontSize: "9px"
      //marginBottom: "-40px"
    };
    var saveStyle = {
      width: "100%",
      marginTop: "5px"
    };


    return (
      <div className="dashboard-module tall" style={overrideStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">
            Score Builder
          </div>
        </div>
        <div className="main">
          <div className="selected-table-container">
          <button  style={buttonStyle} onClick={this.removeSelected} className="btn btn-danger" type="submit">Remove Selected</button>
          <table id="selected-table" className="table table-hover asset-table" cellSpacing="2" width="100%">
            <thead>
              <tr>
                <th></th>
                <th>Asset</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          <div className="form-group">
            <label>Set Name</label>
            <input type="text" id="component-name" className="form-control" ref="component-name" placeholder="Enter Name"/>
            <button  style={saveStyle} onClick={this.saveSet} className="btn btn-primary" type="submit">Save Set</button>
          </div>
        </div>

        </div>

      </div>
    );
  }
});
