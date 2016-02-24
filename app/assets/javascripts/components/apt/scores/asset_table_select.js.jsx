var AssetTableSelect = React.createClass({
  componentDidMount: function() {
    // hack to make sure the dom is rendered
    // before i setup the canvas, call to score.js
    // moving this to component because that's where i'm doing
    // the updates..
    //window.setTimeout(initilizeScoreCanvas, 2000);
  },
  // wrappers for code in score.js
  render: function(){
    var overrideStyle = { };
    var iconStyle = {
      fontSize: "20px"
    };

    return (
      <div id="tree-editor" className="dashboard-module huge" style={overrideStyle}>
          <div className="top">
            <div className="drag-handle">
            </div>
            <div className="top-title">
              Score Builder
            </div>
          </div>
          <div className="main">
            In it
          </div>

      </div>
    );
  }
});
