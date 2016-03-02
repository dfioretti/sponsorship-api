var CreateComponent = React.createClass({

  renderSubnav: function() {
    var link = '/apt/portfolio/dashboard';
    return (
      <div className="details-subnav">
        <div className="details-left-nav">
          <Link to={link}>
            <div className="back-icon"></div>
          </Link>
          <div className="to-dashboard">Back</div>
        </div>
      </div>
    );
  },
  componentWillUnmount: function() {
    var table = $('#component-data-table').DataTable();
    
    //table.destroy();
  },
  componentDidMount: function() {
    this.setGrid();
    $('#component-data-table').DataTable(
      {
        "bPaginate": false,
        "bInfo" : false,
        "bFilter" : false,
        "sScrollY" : "200px",
        "paging" : false,
        "columnDefs" : [
          {
            "width" : "75px",
            "targets" : 0
          }
        ]
    });
    $('.remove-item').click(function(e) {
      var tr = $(this).parent().parent();
      $('#component-data-table').DataTable().row(tr).remove().draw(false);
    });
  },
  removeDataPoint: function(e) {
    if ( $(e.target).is('span') ) {
      console.log("in span");
      var tr = $(e.target).parent().parent();
      $('#component-data-table').DataTable().row(tr).remove().draw(false);
    }
  },
  renderSelectedData: function() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">Selected Data</div>
        <div className="panel-body">
          <table id="component-data-table" cellSpacing="2">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody onClick={this.removeDataPoint} >
              <tr>
                <td>
                  <span className="glyphicon glyphicon-remove remove-item" aria-hidden="true"></span>
                </td>
                <td>
                  <img style={{height: "25px", width: "25px", borderRadius: "50%"}} src="https://logo.clearbit.com/www.twitter.com" />
                </td>
                <td>
                  Twitter Followers
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  },
  renderComponentForm: function() {
    return (
      <div className="detail-module tall">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Configure Component</div>
        </div>
        <div className="main dashboard-detail-margin">
          <div className="form-group">
            <label>Component Name</label>
            <input type="text" id="component_name" className="form-control" placeholder="Enter Name"/>
          </div>
          <div className="form-group">
            <label>Asset Set</label>
            <select className="form-control">
              <option value="New York Teams">
                New York Teams
              </option>
            </select>
          </div>
          <div className="form-group">
            <label>Component Type</label>
            <select className="form-control">
              <option value="barChart">
                Bar Chart
              </option>
              <option value="lineChart">
                Line Chart
              </option>
              <option value="valueList">
                Value List
              </option>
              <option value="barList">
                Bar List
              </option>
              <option value="doughnutChart">
                Doughnut Chart
              </option>
              <option value="pieChart">
                Pie Chart
              </option>
            </select>
          </div>
          {this.renderSelectedData()}
          <button style={{width: "100%"}} onClick={this.saveComponenet} className="btn btn-info">Create Componenet</button>
        </div>
      </div>
    );
  },
  saveComponenet: function() {
    alert("TODO");
  },
  renderAssetSelect: function() {
    return (
      <div className="scroll-boxes">
        <div className="scroll-left">
          <label className="checkbox">
          <input type="checkbox" className="" name="optionsCheckboxList1" value="1" />
            New York Yankees
          </label>
          <label className="checkbox">
          <input type="checkbox" className="" name="optionsCheckboxList1" value="2" />
            New York Knicks
          </label>
          <label className="checkbox">
          <input type="checkbox" className="" name="optionsCheckboxList1" value="3" />
            New York Rangers
          </label>
          <label className="checkbox">
            <input type="checkbox" className="" name="optionsCheckboxList1" value="4" />
            New York Giants
          </label>
        </div>
        <div className="scroll-right">
          <label className="checkbox">
          <input type="checkbox" className="" name="optionsCheckboxList1" value="1" />
            New York Islanders
          </label>
          <label className="checkbox">
          <input type="checkbox" className="" name="optionsCheckboxList1" value="2" />
            New York Mets
          </label>
          <label className="checkbox">
          <input type="checkbox" className="" name="optionsCheckboxList1" value="3" />
            New York Jets
          </label>
          <label className="checkbox">
            <input type="checkbox" className="" name="optionsCheckboxList1" value="4" />
            New York Redbulls
          </label>
        </div>
      </div>
    );
  },
  renderConfigureView: function() {
    return (
      <div className="detail-module">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Configure View</div>
        </div>
        <div className="main dashboard-detail-margin">
          <div className="form-group">
            {this.renderAssetSelect()}
          </div>
        </div>
      </div>
    );
  },
  renderDataForm: function() {
    return (
      <div className="detail-module">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Select Data</div>
        </div>
        <div className="main dashboard-detail-margin">
          <div className="form-group">
            <label>Data Metric</label>
            <select className="form-control">
              <option>
                Facebook Fans
              </option>
              <option>
                Twitter Followers
              </option>
              <option>
                Klout Score
              </option>
              <option>
                Facebook Conversation
              </option>
            </select>
          </div>
          <div className="form-group">
            <label>Interval</label>
            <select className="form-control">
              <option>
                Weekly
              </option>
              <option>
                Monthly
              </option>
              <option>
                Quarterly
              </option>
              <option>
                Yearly
              </option>
            </select>
          </div>
          <div className="form-group">
            <button style={{width: "100%"}} onClick={this.addDataToComponent} className="btn btn-info">Add Data To Componenet</button>
          </div>
        </div>
      </div>
    );
  },
  addDataToComponent: function() {
    //<img style={{height: "25px", width: "25px", borderRadius: "50%"}} src="https://logo.clearbit.com/www.twitter.com" />
    console.log("DSLKDJF:L");
    var table = $('#component-data-table').DataTable();
    var node = table.row.add([
      "<span class='glyphicon glyphicon-remove remove-item' aria-hidden='true'></span>",
      "<img style='height: 25px; width: 25px; border-radius: 50%;' src='https://logo.clearbit.com/www.facebook.com'  />",
      "Facebook Fans"
    ]).draw(false);
    console.log("todo: add data");
  },
  setGrid: function() {
    $('.details-container').shapeshift({
      selector: ".detail-module",
      handle: ".drag-handle",
      align: "left",
      autoHeight: false,
      gutterX: 20,
      gutterY: 20,
      paddingX: 20,
      paddingY: 20
    });
  },
  render : function() {
    return (
      <div style={{height: "100%"}} >
        {this.renderSubnav()}
        <div className="details-box">
          <div className="details-container">
            {this.renderComponentForm()}
            {this.renderDataForm()}
            {this.renderConfigureView()}
          </div>
        </div>
      </div>
    );
  }
});
