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
    var componentName = $('#component-name').val();
    var icon = '/sum.png';
    //var x = $("#weight-slider").slider();
    //console.log(x.slider('getValue'));
    //vr weight = weightSlider.slider('getValue');
    var weight = $('.tooltip-inner').text();
    console.log(weight);
    updateData(componentName, "component");
    updateData(weight, "weight");
    //updateData(weight, "title");
    //updateData(weight, "title");
    // here we are going to update that jazz
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
              <select className="form-control" ref="asset-set">
                <option>
                  None
                </option>
                <option>
                  Normal Owned
                </option>
                <option>
                  Normal All
                </option>
              </select>
              <div className="score-component-radio">
                <ul>
                  <li onClick={this.parentClick}>
                    <input type="radio" id="f-option" name="selector"/>
                    <label htmlFor="f-option">Parent</label>
                    <div className="check"></div>
                  </li>
                  <li onClick={this.valueClick}>
                    <input type="radio" id="s-option" name="selector"/>
                    <label htmlFor="s-option">Value</label>
                    <div className="check"></div>
                  </li>
                </ul>
              </div>

              <div id="parent" style={hidden} className="component-default">
                <label style={cssSucks}>Operation</label>
                <select className="form-control" ref="asset-set">
                  <option>
                    SUM
                  </option>
                  <option>
                    DIFFERENCE
                  </option>
                  <option>
                    DIVIDE
                  </option>
                  <option>
                    MULTIPLY
                  </option>
                </select>
              </div>
              <div id="value" style={hidden} className="component-default">
                <button className="btn btn-block drilldown" id="drill-button" data-toggle="dropdown">
                  <span className="text" placeholder="Select...">Test</span>
                </button>
              </div>
              <button onClick={this.updateComponent} className="btn primary" type="submit">Update</button>
            </form>

          </div>
        </div>
      </div>
    );
  }

});
