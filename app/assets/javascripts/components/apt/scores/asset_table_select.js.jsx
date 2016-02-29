var AssetTableSelect = React.createClass({
  statics: {
    addAsset: function(aid) {
      console.log('called add asset' + aid);
      //var asset = AssetsStore.find(aid);
      var assets = AssetsStore.getState().assets;
      var asset;
      var i = 0;
      for (i; i < assets.length; i++) {
        if (assets[i].id == aid) {
          asset = assets[i];
          break;
        }
      }
      var table = $('#asset-table').DataTable();
      var node = table.row.add([
        "<img style='height: 50px; width: 50px; border-radius: 50%;' src='" + asset.thumb + "'' />",
        asset.name,
        asset.scope,
        asset.category,
        asset.subcategory
      ]).draw(false).node();
      console.log("node " + node);
      $(node).attr('data-id', aid);
    }
  },
  componentDidMount: function() {
    $('#asset-table').DataTable(
      {
        "bPaginate": false,
        "bInfo" : false,
        "oLanguage" : {
          "sSearch" : "",
        },
        "sScrollY" : "400px",
        "bScrollCollapse" : false,
        "paging" : false,
        "columnDefs" : [
          {
          'width' : "150px",
          'targets' : 1
          }
        ],
      }
    );
    $('#asset-table tbody').on('click', 'tr', function() {
      $(this).toggleClass('asset-selected');
    });
  },
  componentWillMount: function() {
    AssetsStore.setCurrent();

    AssetsStore.on("update", function() {
      this.setState({loaded: true});
    }.bind(this));
  },
  renderList: function() {
    var assets = AssetsStore.getState().assets;
    var imgStyle = {
      height: "50px",
      width: "50px",
      borderRadius: "50%"
    };

    var list = $.map(assets, function(asset) {
      return (
        <tr data-id={asset.id}>
          <td data-id={asset.id}>
            <img style={imgStyle}src={asset.thumb}/>
          </td>
          <td>
            {asset.name}
          </td>
          <td>
            {asset.scope}
          </td>
          <td>
            {asset.category}
          </td>
          <td>
            {asset.subcategory}
          </td>
        </tr>
      );
    }.bind(this));
    return (
      <tbody>
        {list}
      </tbody>
    );

  },
  selectAll: function() {
    $('tr', '#asset-table tbody').addClass('asset-selected');
  },
  deselectAll: function() {
    $('tr', '#asset-table tbody').removeClass('asset-selected');
  },
  addSelected: function() {
    var selected = $('.asset-selected', '#asset-table');
    var i = 0;
    for (i; i < selected.length; i++) {
        var tr = selected[i];
        var td = $('td', tr);
        var id = $(tr).data('id');
        console.log("asset ID!: " + id);
        var sel = $('#selected-table').DataTable();
        if (typeof(id) != "undefined") {
        var asset = AssetsStore.find(id);
        var img = asset.thumb;
        console.log("the id " + id);
        var node = sel.row.add([
          "<img style='height: 50px; width: 50px; border-radius: 50%;' src='" + asset.thumb + "'' />",
          asset.name
        ]).draw(false).node();
        $(node).attr('data-id', id);
        var rows = $('tr', '#selected-table');
        //console.log("row count " + rowCount.length);
        //$(rows[1]).attr('data-id', id);
        //var tableRows = $('tr', '#selected-table');
        //var rows = $('tr', '#selected-table');
        //$(rows[rows.length]).attr('data-id', id);
        //var tds = $('td', rows[i + 1]);
        //$(tds[0]).data('id', id);
        //console.log("ROWS: " + rows.length);
        //var selectedRow = (rows[i + 1]);
        //var data = $('td', selectedRow);
        //console.log("selected row? " + selectedRow);
        //$(selectedRow).data('asset', id);
        //$(selectedRow).attr('data-id', id);
        //console.log(data);
        //$(data[0]).data('id', id).draw(false);

        //$(rows[i + 1]).data('id', id);
        $('#asset-table').DataTable().row(tr).remove().draw(false);
        //$(tr).remove().draw(false);
      }
    }
  },
  render: function() {
    var overrideStyle = {};
    var iconStyle = {
      fontSize: "20px",
    };

    var buttonStyle = {
      width: "130px",
      marginBottom: "-40px"
    };


    return (
      <div className="dashboard-module huge" style={overrideStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">
            Asset Set Builder
          </div>
        </div>
        <div className="main">
          <div className="asset-table-container">
          <button  style={buttonStyle} onClick={this.selectAll} className="btn btn-default" type="submit">Select All</button>
          <button  style={buttonStyle} onClick={this.deselectAll} className="btn btn-default" type="submit">Deselect All</button>
          <button  style={buttonStyle} onClick={this.addSelected} className="btn btn-default" type="submit">Add Selected</button>

          <table id="asset-table" className="table table-hover asset-table" cellSpacing="2" width="100%">
            <thead>
              <tr>
                <th></th>
                <th>Asset</th>
                <th>Scope</th>
                <th>Category</th>
                <th>Subcategory</th>
              </tr>
            </thead>
            {this.renderList()}
          </table>
        </div>
        </div>

      </div>
    );
  }
});
