var ComponentPane = React.createClass({
  componentDidMount: function() {
    weightSlider = $("#weight-slider").slider({min: 0, max: 100, value: 100});
    //$('.score-component-form').jScrollPane();
    //$('#drill-button').drilldownSelect( { appendValue: true, data: data });
  },
  handleClick: function(e) {
    e.preventDefault();
  },
  valueClick: function() {
    $('#value').show();
    $('#parent').hide();
  },
  parentClick: function() {
    $('#parent').show();
    $('#value').hide();
  },
  updateComponent: function(e) {
    e.preventDefault();
    // update componenet name
    var componentName = $('#component-name').val();
    if (componentName.length < 2) {
      setAlert("Error: Invalid component name!", "error");
      return;
    }
    updateData(componentName, "component");

    // weight from slider
    var weight = $('.tooltip-inner').text();
    updateData(weight, "weight");

    // update operations
    var operationText = $('#operation').find(":selected").text();
    var operationValue = $('#operation').find(":selected").val();
    var normalization = $('#normalization-select').val();

    // is it a parent or a chid
    var selected = $(".score-component-radio input[type='radio']:checked");
    if (selected.length == 0) {
      setAlert("Error: Must select set parent or value node!", "error");
      return;
    }

    updateData(normalization, "normalization");

    var selectedId = selected[0].id
    if (selectedId === 'parent-opt') {
      alert('in parent');
      updateData('parent', 'mode');
      updateData(operationText, 'icon');
      updateData(operationValue, 'operation');
    } else if (selectedId === 'value-opt') {
      alert('in value');
      updateData('value', 'mode');
      updateData($('#drill-data').data('id'), 'icon');
      //updateData('data-path', $('#drill-data').data('path'));
      updateData(getDrillButtonText(), 'dataname');
    }

  },
  render: function() {
    // for some reason 100% doesn't work?
    var sliderStyle = {
      width: "360px",
      marginBottom: "20px"
    };
    var cssSucks = {
      marginTop: "15px"
    };
    var hidden = {
      display: "none"
    };

    return (
      <div id="component-pane" className="dashboard-module tall">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">
            Component Details
          </div>
        </div>
        <div className="main">
          <div className="score-component-form">
            <form>
              <div className="form-group">
                <label>Component Name</label>
                <input type="text" id="component-name" className="form-control" ref="component-name" placeholder="Enter Name"/>
              </div>
              <label>Component Weight</label>
              <div id="weight-slider" className="slider" style={sliderStyle}></div>
              <label style={cssSucks}>Normalization</label>
              <select id="normalization-select" className="form-control" ref="asset-set">
                <option value="None">
                  None
                </option>
                <option value="Normal Owned">
                  Normal Owned
                </option>
                <option value="Normal All">
                  Normal All
                </option>
              </select>
              <div className="score-component-radio">
                <ul>
                  <li onClick={this.parentClick}>
                    <input type="radio" id="parent-opt" name="selector"/>
                    <label id="parent-click" htmlFor="parent-opt">Parent</label>
                    <div className="check"></div>
                  </li>
                  <li onClick={this.valueClick}>
                    <input type="radio" id="value-opt" name="selector"/>
                    <label id="value-click" htmlFor="value-opt">Value</label>
                    <div className="check"></div>
                  </li>
                </ul>
              </div>

              <div id="parent" style={hidden} className="component-default">
                <label style={cssSucks}>Operation</label>
                <select id="operation" className="form-control" ref="asset-set">
                  <option value="0">
                    SUM
                  </option>
                  <option value="1">
                    DIFFERENCE
                  </option>
                  <option value="2">
                    DIVIDE
                  </option>
                  <option value="3">
                    MULTIPLY
                  </option>
                </select>
              </div>
              <div id="value" style={hidden} className="component-default">
                <label style={cssSucks}>Data Point</label>
                <button className="btn primay btn-block drilldown" id="drill-button" data-toggle="dropdown">
                  <span className="text" placeholder="Select...">Test</span>
                </button>
              </div>
              <button onClick={this.updateComponent} className="btn primary" type="submit">Update</button>
            </form>

          </div>
        </div>
        <div className="drill-data" id="drill-data" style={hidden} />
      </div>
    );
  }

});
