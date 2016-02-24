var AssetTableSelect = React.createClass({
  componentDidMount: function() {
    $('#asset-table').DataTable(
      {
        "bPaginate": false
      }
    );
    $('#asset-table tbody').on('click', 'tr', function() {
      $(this).toggleClass('asset-selected');
    })
  },
  componentWillMount: function() {
    AssetsStore.setCurrent();

    AssetsStore.on("update", function() {
      this.setState({loaded: true});
    }.bind(this));
  },
  renderList: function() {
    var assets = AssetsStore.getState().assets;
    console.log(assets);

    var list = $.map(assets, function(asset) {
      console.log(asset);
      return (
        <tr>
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
  render: function() {
    var overrideStyle = {};
    var iconStyle = {
      fontSize: "20px",
    };

    return (
      <div className="dashboard-module huge" style={overrideStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">
            Score Builder
          </div>
        </div>
        <div className="main">
          <div className="asset-table-container">
          <table id="asset-table" className="table table-hover asset-table" cellspacing="2" width="100%">
            <thead>
              <tr>
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
