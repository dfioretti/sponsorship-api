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
    $('#asset-set-name').val(this.props.asset_set.name);
    var items = this.props.asset_set.asset_set_items;
    console.log(items);
    for (var i = 0; i < items.length; i++) {
      var itemId = items[i]['asset_id'];
      var f = $("#asset-table").find("[data-id='" + itemId + "']")[0];
      var thumb = $('img', f).attr('src');
      var name = $($('td', f)[1]).text();
      console.log(name);
      console.log($('td', f));
      console.log($('td', f)[1]);
      $('#asset-table').DataTable().row(f).remove().draw(false);
      var sel = $('#selected-table').DataTable();
      var asset = (this.props.asset_set);
      var node = sel.row.add([
        "<img style='height: 50px; width: 50px; border-radius: 50%;' src='" + thumb + "'' />",
        name
      ]).draw(false).node();
      $(node).attr('data-id', itemId);
    }
  },
  saveSet: function() {
    var asset_set = this.props.asset_set;
    console.log("asset set " + asset_set.id);
    asset_set['name'] = $("#asset-set-name").val();
    var asset_set_items = [];
    var selectedTable = $('tbody', '#selected-table');
    var selected_assets = $('tr', selectedTable);

    for (var i = 0; i < selected_assets.length; i++) {
      var tr = selected_assets[i];
      var id = $(tr).data('id');
      if (typeof(id) != 'undefined')
        asset_set_items.push( { 'asset_id' : $(tr).data('id') } );
    }
    console.log("asset set items " + asset_set_items);
    if (asset_set_items.length > 0) {
      console.log(asset_set_items.length);
      asset_set['asset_set_items_attributes'] = asset_set_items;
    }
    AssetSetsStore.update(asset_set, function(asset_set) {
        console.log("doin update yo");
    });
    console.log(asset_set_items);
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
            <input type="text" id="asset-set-name" className="form-control" ref="component-name" placeholder="Enter Name"/>
            <button  style={saveStyle} onClick={this.saveSet} className="btn btn-primary" type="submit">Save Set</button>
          </div>
        </div>

        </div>

      </div>
    );
  }
});
