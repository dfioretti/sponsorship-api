var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

var EditorSubNav = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ComponentEditorStore")],

  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },
  handleNewClick: function() {
    this.getFlux().actions.newComponent();
  },
  handleSaveClick: function() {
    if (this.props.handleSave !== null) {
      this.props.handleSave();
      return;
    }
    if (this.getStateFromFlux().id !== null) {
      this.getFlux().actions.updateComponent();
    }
    else {
      this.getFlux().actions.saveComponent();
    }
  },
  handleBackClick: function() {
    ReactRouter.HashLocation.pop();
  },
  render: function() {
    var message = ""
    if (this.props.message === null) {
      message = this.getStateFromFlux().message;
    } else {
      message = this.props.message;
    }
    return (
      <div className="subnav">
        <div className="filter-row">
          <div onClick={this.handleBackClick} style={{cursor: "pointer", height: "70px", borderRight: "1px solid #b9c3ca", opacity: "0.6"}} className="col-md-1">
            <img style={{height: "20px", width: "20px", marginRight: "8px", marginTop: "-4px"}}src="/edit/arrows.png" />
            Back
          </div>
          <div onClick={this.handleNewClick} style={{cursor: "pointer", height: "70px", borderRight: "1px solid #b9c3ca", opacity: "0.6"}} className="col-md-1">
            New
            <img style={{height: "20px", width: "20px", marginLeft: "8px", marginTop: "-4px"}}src="/edit/interface.png" />
          </div>
          <div onClick={this.handleSaveClick} style={{cursor: "pointer", height: "70px", borderRight: "1px solid #b9c3ca", opacity: "0.6"}} className="col-md-1">
            Save
            <img style={{height: "20px", width: "20px", marginLeft: "8px", marginTop: "-4px"}}src="/edit/vintage.png" />
          </div>
          <div onClick={this.handleSaveClick} style={{cursor: "pointer", float: "right", height: "70px", opacity: "1"}} className="col-md-3">
            {message}
          </div>
        </div>
      </div>
    );

  }


});
