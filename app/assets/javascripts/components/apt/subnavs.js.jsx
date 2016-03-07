var EditorSubNav = React.createClass({
  mixins: [FluxMixin],

  getStateFromFlux: function() {
    return flux.store("ComponentStore").getState();
  },
  handleSaveClick: function() {
    this.getFlux().actions.saveComponent();
  },
  render: function() {
    return (
      <div className="subnav">
        <div className="filter-row">
          <div onClick={this.handleSaveClick} style={{cursor: "pointer", height: "70px", borderRight: "1px solid #4a4a4a", opacity: "0.4"}} className="col-md-1">
            Save
            <img style={{height: "20px", width: "20px", marginLeft: "8px", marginTop: "-4px"}}src="/edit/vintage.png" />
          </div>
        </div>
      </div>
    );

  }


});
