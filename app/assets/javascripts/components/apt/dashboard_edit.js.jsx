

var DashboardEditName = React.createClass({
  mixins: [FluxMixin],
  getStateFromFlux: function() {
    return this.getFlux().store("DashboardCreateStore").getState();
  },
  handleNameChange: function(e) {
    this.getFlux().actions.updateDashboardName(e.target.value);
  },
  render: function() {
    return (
      <div className="dasboard-edit-name">
        <div className="form-group">
          <label>Dashboard Name</label>
          <input type="text" value={this.getStateFromFlux().dashboardName} onChange={this.handleNameChange} className="form-control" placeholder="Enter Name" />
        </div>
      </div>
    );
  }
});

var DashboardEditBody = React.createClass({
  mixins: [FluxMixin],
  getStateFromFlux: function() {
    return this.getFlux().store("DashboardCreateStore").getState();
  },
  render: function() {
    return (
      <div className="row dashboard-edit-body">
        {this.getStateFromFlux().availableComponents.map(function(component) {
          return <DashboardEditComponentRow key={component.id} component={component} />;
        })}
      </div>
    );
  }
});

var AddRemoveComponentButton = new React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DashboardCreateStore")],

  getStateFromFlux: function() {
    return this.getFlux().store("DashboardCreateStore").getState();
  },
  handleAddComponent: function(e) {
    console.log(e.target.id);
    this.getFlux().actions.addDashboardComponent(e.target.id);
  },
  handleRemoveComponent: function(e) {
    this.getFlux().actions.removeDashboardComponent(e.target.id);
  },
  render: function() {
    console.log(this.props.component.id);
    if (this.getStateFromFlux().selectedComponents.indexOf(this.props.component.id.toString()) != -1) {
      return (
        <span style={{color: "#e76959", padding: "5px"}}onClick={this.handleRemoveComponent} id={this.props.component.id} className="glyphicon glyphicon-remove actionable" aria-hidden="true"></span>
      );
    } else {
      return (
        <span style={{color: "#50e3c2", padding: "5px"}} onClick={this.handleAddComponent} id={this.props.component.id} className="glyphicon glyphicon-plus actionable" aria-hidden="true"></span>
      );
    }
  }

});
var DashboardEditComponentRow = React.createClass({
  mixins: [FluxMixin],
  render: function () {
    var i = 1000;
    return (
      <div className="dash-edit-component-row">
        <div className="col-md-5 bs-col">
          {this.props.component.name}
        </div>
        <div className="col-md-3 bs-col">
          {this.props.component.view.split(/(?=[A-Z])/).join(" ")}
        </div>
        <div className="col-md-3 small-round-images bs-col">
          {this.props.component.model.data.map(function(d) {
            return (
              <img key={i--} src={d.metric.point_image} />
            );
          })}
        </div>
        <div className="col-md-1 add-remove-button bs-col">
          <AddRemoveComponentButton key={this.props.component.id} component={this.props.component} />
        </div>
      </div>
    );
  }
});

var DashboardEditFooter = React.createClass({
  mixins: [FluxMixin],
  render: function() {
    return (
      <div className="dashboard-edit-footer">
          Footer
      </div>
    )
  }

});
