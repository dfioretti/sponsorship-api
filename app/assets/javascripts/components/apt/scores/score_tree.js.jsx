var ScoreTree = React.createClass({
  componentDidMount: function() {
    // hack to make sure the dom is rendered
    // before i setup the canvas, call to score.js
    window.setTimeout(initilizeScoreCanvas, 2000);
  },
  render: function(){
    var hiddenStyle = {};

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
      </div>
    );
  }
});
