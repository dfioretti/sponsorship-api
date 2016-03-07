var Configurable = React.createClass({
  componentDidMount: function() {
    console.log("huh");
    $(this.refs.flipper).flip();
  },
  componentWillReceiveProps: function(newProps) {
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};

    return (
    <div id="configurable" style={{background: "transparent", borderColor: "#03387a", borderStyle: "solid", borderWidth: "15px"}} className="dashboard-module component-wrapper" ref="flipper" >
      <div className="front" style={{background: "#2d64a5"}}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Some Component</div>
        </div>
        <div className="main">
          <div style={{width: "75px", height: "75px"}}>
            <h1>Hi</h1>
          </div>
        </div>
      </div>
      <div className="back" style={{background: "#b9c3ca"}}>
        <div className="top" style={{background: "transparent"}}>
          <div className="drag-handle"></div>
          <div className="top-title">Configure Component</div>
        </div>
        <div className="main">
          <img src="/images/987.jpg" />
        </div>
      </div>
    </div>

    );
  }
});
