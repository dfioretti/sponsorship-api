var ComponentPane = React.createClass({
  componentDidMount: function() {
    weightSlider = $("#weight-slider").slider({min: 0, max: 100, value: 100});
    //$('#drill-button').drilldownSelect( { appendValue: true, data: data });
  },
  handleClick: function(e) {
    e.preventDefault();
  },
  updateComponent: function(e) {
    e.preventDefault();
    var componentName = $('#component-name').val();
    //vr weight = weightSlider.slider('getValue');
    var weight = $('.tooltip-inner').text();
    updateData(componentName, "name");
    updateData(weight, "title");
    //updateData(weight, "title");
    // here we are going to update that jazz
  },
  render: function() {
    // for some reason 100% doesn't work?
    var sliderStyle = {
      width: "380px",
      marginBottom: "20px"
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
                <input type="text" id="component-name" className="form-control" ref="component-name" placeholder="Component Name"/>
              </div>
              <label>Asset Set</label>
              <select className="form-control" ref="asset-set">
                <option>
                  Regional Asset Set
                </option>
                <option>
                  National Asset Set
                </option>
                <option>
                  NBA Assets
                </option>
                <option>
                  MLB Assets
                </option>
              </select>
              <label>Weight</label>
              <div id="weight-slider" className="slider" style={sliderStyle}></div>

              <button onClick={this.updateComponent} className="btn primary" type="submit">Update</button>
                <span class="glyphicon glyphicon-star" aria-hidden="true"></span> Star

              <div id="data-list" className="hidden">
                <ul>
                    <li>
                      Test 1
                    </li>
                    <li>
                      Test 2
                    </li>
                </ul>
              </div>
            </form>
            <button className="btn btn-danger btn-block drilldown" id="drill-button" data-toggle="dropdown">
              <span className="text" placeholder="Select...">Test</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

});
