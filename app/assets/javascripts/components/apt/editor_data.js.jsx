var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;


var AddedData = React.createClass({
  mixins: [FluxMixin],
  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },
  handleRemoveData: function(e) {
    this.getFlux().actions.removeData(e.target.id);
    this.getFlux().actions.generatePreviewData();
  },
  formatPoint: function(poing) {
    return "point";
  },
  render: function() {
    var imgStyle = {
      height: "40px",
      width: "40px",
      borderRadius: "50%",
      marginLeft: "0px"
    };
    var imgSmall = {
      height: "20px",
      width: "20px",
      borderRadius: "50%",
      marginLeft: "0px",
      marginTop: "10px",
      cursor: "pointer"
    };
    //target.parentNode.
    var remove = "/icons-blue/MULTIPLY.png";
    var i = 0;
    return (
      <div className="row filter-row">
        {this.getStateFromFlux().data.map(function(item) {
            return (
              <div key={i} style={{padding: "10px", marginBottom: "10px", height: "50px", marginRight: "20px", borderTop: "0px solid #3c88d1"}}>
                <div className="col-md-3 filter-row" style={{height: "40px"}}>
                  <img style={imgStyle} src={item.metric.point_image} />
                </div>
                <div className="col-md-6 filter-row" style={{textTransform: "capitalize", lineHeight: "40px", height: "40px"}}>
                  {item.metric.point.split("_").pop()}
                </div>
                <div className="col-md-3 filter-row" style={{height: "40px"}}>
                  <img id={i++} onClick={this.handleRemoveData} style={imgSmall} src={remove} />
                </div>
              </div>
                  );
        }.bind(this))}
      </div>
    );
  }
});


var EditorData = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ComponentEditorStore")],


  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("ComponentEditorStore").getState();
  },
  render: function() {
    return (
      <div className="editor-data">
        <div className="input-heading">
          Component Settings
        </div>
          <div className="row">
            <div style={{marginLeft: "20px"}}className="col-md-5">
              <h4>Settings</h4>
              <ul style={{listStyle: "none", paddingLeft: "5px"}}>
                <li style={{fontSize: "15px", paddingBottom: "5px", textTransform: "uppdercase", letterSpacing: "1.5px"}}>
                  Component Name
                </li>
                <li>{this.getStateFromFlux().title }</li>
                <li style={{fontSize: "15px", paddingTop: "10px", paddingBottom: "5px", textTransform: "uppdercase", letterSpacing: "1.5px"}}>
                  Component Style
                </li>
                <li>{this.getStateFromFlux().view }</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h4>Data</h4>
              <div style={{height: "250px", overflowY: "scroll"}}className="added-data">
                <AddedData />
              </div>
            </div>
          </div>
      </div>
    );
  }

});
