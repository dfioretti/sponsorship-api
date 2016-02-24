var ComponentPane = React.createClass({
  componentDidMount: function() {
    weightSlider = $("#weight-slider").slider({min: 0, max: 100, value: 100});
    var savedModel = this.props.score.score;
    $('#score-name').val(this.props.score.name);
    $('#score-asset-set').val(this.props.score.asset_set_name);

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
    score['name'] = $('#score-name').val();
    score['asset_set_name']= $('#score-asset-set').find(":selected").text();

    // i don't know why these callbacks don't work, guess i should probably figure out how react works?
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
      width: "336px",
      marginBottom: "20px"
    };
    var cssSucks = {
      marginTop: "10px"
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
      marginTop: "25px",
      width: "85%",
      marginLeft: "30px"
    };
    var fuckHR = {
      //marginTop: "0px",
      width: "88%"
    };

    var firstHR = {
      margin: "10px"
    };
    var padForm = {
      marginTop: "10px"
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
                  <option value="Regional Sports">
                    Regional Sports
                  </option>
                  <option value="National Assets">
                    National Assets
                  </option>
                  <option value="All Assets">
                    All Assets
                  </option>
                  <option value="Celebrities">
                    Celebrities
                  </option>
                </select>
              </form>
              <hr sytle={firstHR}/>
              <button  style={buttonStyle} onClick={this.zoomToFit} className="btn btn-primary" type="submit">Zoom to Fit</button>
              <br /><br />
              <button  style={buttonStyle} onClick={this.centerDiagram} className="btn btn-info" type="submit">Reset Alignment</button>
              <br /><br />
              <button  style={buttonStyle} onClick={this.resetDiagram} className="btn btn-danger" type="submit">Reset Score</button>


            </div>
          </div>
          <div style={hidden} id="component-data" className="main">
            <div className="score-component-form">
              <form style={padForm}>
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
                      <label id="parent-click" htmlFor="parent-opt">Parent</label>
                      <input type="radio" id="parent-opt" name="selector"/>
                      <div className="check"></div>
                    </li>
                    <li onClick={this.valueClick}>
                      <label id="value-click" htmlFor="value-opt">Value</label>
                      <input type="radio" id="value-opt" name="selector"/>
                      <div id="value-check" className="check2"></div>
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
                  <button className="btn btn-info btn-block drilldown" id="drill-button" data-toggle="dropdown">
                    <span className="text" placeholder="Select...">Test</span>
                  </button>
                </div>
              </form>



            </div>
            <div className="updateComponentButton">
              <hr style={fuckHR} />
              <button id="save-score-btn" onClick={this.updateComponent} className="btn btn-primary" type="submit">Update Selected</button>
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
