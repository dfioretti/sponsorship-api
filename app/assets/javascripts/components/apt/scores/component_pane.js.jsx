var ComponentPane = React.createClass({
  componentDidMount: function() {
    weightSlider = $("#weight-slider").slider({min: 0, max: 100, value: 100});
    var savedModel = this.props.score.score;
    window.setTimeout(initilizeScoreCanvas(savedModel), 1200);
  },
  componentWillMount: function() {
    ScoresStore.on("update", function() {
      setAlert("Score model saved!", "notice");
    }.bind(this));

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
  saveScore: function() {
    console.log("saving score");
    var score = this.props.score;
    var imageParams = {
      "size": new go.Size(290, 220)
    };
    var scoreImage = myDiagram.makeImageData();
    score['score'] = myDiagram.model.toJson();
    score['image'] = scoreImage;
    ScoresStore.update(score, function(score) {
      setAlert("Score model saved2", "notice");
      this.handleChange();
    }.bind(this));
    setAlert("Score model saved!", "notice");
  },
  handleChange: function() {
    console.log("sup");
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
      updateData('parent', 'mode');
      updateData(operationText, 'icon');
      updateData(operationValue, 'operation');
    } else if (selectedId === 'value-opt') {
      updateData('value', 'mode');
      updateData($('#drill-data').data('id'), 'icon');
      //updateData('data-path', $('#drill-data').data('path'));
      updateData(getDrillButtonText(), 'dataname');
    }

  },
  zoomToFit: function() {
    myDiagram.commandHandler.zoomToFit();
  },
  resetDiagram: function() {
    alert("TODO - reset diagram");
  },
  centerDiagram: function() {
    //var model = myDiagram.model.toJson();
    //initilizeScoreCanvas(model);
    reload();

    //myDiagram.contentAlignment = go.Spot.Center;
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

    var formStyle = {
      height: "560px",
      padding: "10px"
    };

    var buttonStyle = {
      width: "100%",
      padding: "10px"
    };
    var saveScoreOverride = {
      marginTop: "-10px",
      width: "100%",
      padding: "10px"
    };

    return (
      <div id="component-pane" className="dashboard-module tall">
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">
            Editor Panel
          </div>
        </div>
        <div style={formStyle} className="editor-container">
          <div id="score-data" className="main">
            <div className="score-component-form">
              <form>
                <div className="form-group">
                  <label>Score Name</label>
                  <input type="text" id="score-name" className="form-control" placeholder="Enter Name"/>
                </div>
                <label>Asset Set</label>
                <select id="score-asset-set" className="form-control">
                  <option>
                    Regional Sports
                  </option>
                  <option>
                    National Assets
                  </option>
                  <option>
                    All Assets
                  </option>
                  <option>
                    Celebrities
                  </option>
                </select>
              </form>
              <br />
              <hr />
              <button  style={buttonStyle} onClick={this.zoomToFit} className="btn btn-primary" type="submit">Zoom to Fit</button>
              <br /><br />
              <button  style={buttonStyle} onClick={this.centerDiagram} className="btn btn-info" type="submit">Reset Alignment</button>
              <br /><br />
              <button  style={buttonStyle} onClick={this.resetDiagram} className="btn btn-danger" type="submit">Reset Score</button>


            </div>
          </div>
          <div style={hidden} id="component-data" className="main">
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
              </form>
              <button id="save-score-btn" onClick={this.updateComponent} className="btn primary" type="submit">Update</button>

            </div>
          </div>
          <div className="drill-data" id="drill-data" style={hidden}/>
          <textarea style={hidden} id="mySavedModel"></textarea>
        </div>
        <div className="fixedButton">
          <button onClick={this.saveScore} style={saveScoreOverride} className="btn primary" type="submit">Save Score</button>
        </div>
      </div>
    );
  }

});
