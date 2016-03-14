var CreateDashboardModal = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DashboardCreateStore")],

  getStateFromFlux: function() {
    return this.getFlux().store("DashboardCreateStore").getState();
  },
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  handelAddComponent: function() {
    console.log("TODO");
  },
  renderComponents: function() {
    var components = flux.store("ComponentsStore").getComponents();
    var comList = new Array();
    for (var key in components) {
      comList.push(components[key]);
    }

    return (
      <table style={{height: "200px", overflowY: "scroll"}}>
        <tbody>
        {comList.map(function(item) {
          return (
          <tr key={item.id}>
          <td style={{padding: "10px", fontSize: "17px"}}>
            {item.name}
          </td>
          <td style={{padding: "10px", fontSize: "17px", paddingLeft: "60px"}}>
            <div onClick={this.handelAddComponent} className="glyphicon glyphicon-plus" aria-hidden="true"></div>
          </td>
          </tr>)
        })}
        </tbody>
      </table>
    );

  },
  render() {
    //let popover = <ReactBootstrap.Popover title="popover">very popover. such engagement</ReactBootstrap.Popover>;
    //let tooltip = <ReactBootstrap.Tooltip>wow.</ReactBootstrap.Tooltip>;


    /*

    <ReactBootstrap.Button onClick={this.close}>Close</ReactBootstrap.Button>
    <ReactBootstrap.Button bsStyle="primary" onClick={this.close}>Save</ReactBootstrap.Button>
    <h4>Dashboard Name</h4>
    <input type="text" className="form-control" placeholder="Enter Name" />
    <hr />
    <h4>Add Components</h4>
    </ReactBootstrap.Modal.Body>
    <ReactBootstrap.Modal.Body style={{maxHeight: "400px", overflowY: "scroll"}}>
      {this.renderComponents()}

    */
    if (this.props.mode === 'create') {

    } else {

    }

    return (
      <div>
        <li style={{cursor: "pointer", fontSize: "13px"}}onClick={this.open}>
          &nbsp;&nbsp;- Create
        </li>

        <ReactBootstrap.Modal  show={this.state.showModal} onHide={this.close}>
          <ReactBootstrap.Modal.Header closeButton>
            <h4 className="heading-text">Create New Dashboard</h4>
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>
            <DashboardEditName />
            <DashboardEditBody />
            </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer>
            <DashboardEditFooter modal={this} />
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal>
      </div>
    );
  }
});
