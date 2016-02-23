var ScoreTree = React.createClass({
  componentDidMount: function() {
    // hack to make sure the dom is rendered
    // before i setup the canvas, call to score.js
    window.setTimeout(initilizeScoreCanvas, 2000);
  },
  // wrappers for code in score.js
  zoomIn: function() {
    zoomIn();
  },
  zoomOut: function() {
    zoomOut();
  },
  render: function(){
    var hiddenStyle = {};
    var iconStyle = {
      fontSize: "20px"
    };

    return (
      <div id="tree-editor" className="dashboard-module huge" style={hiddenStyle}>
          <div className="top">
            <div className="drag-handle">
            </div>
            <div className="top-title">
              Tree Editor
            </div>
          </div>
          <div className="main">
            <div id="myDiagram">
            </div>
          </div>
          <div className="commands">
            <span onClick={this.zoomIn} style={iconStyle} className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
            <br />
            <span onClick={this.zoomOut} style={iconStyle} className="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
          </div>
      </div>
    );
  }
});
