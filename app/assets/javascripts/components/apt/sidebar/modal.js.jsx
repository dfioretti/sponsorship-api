var CreateDashboardModal = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DashboardEditStore")],

  componentDidMount: function() {
  },
  getStateFromFlux: function() {
    return this.getFlux().store("DashboardEditStore").getState();
  },
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    if (this.props.mode === 'edit') {
      this.getFlux().actions.dashboardEditLoad(this.props.dashboardId);
    } else {
      this.getFlux().actions.dashboardEditLoad(null);
    }
    this.setState({ showModal: true });
  },

  handelAddComponent: function() {
    console.log("TODO");
  },
  render() {
    //let popover = <ReactBootstrap.Popover title="popover">very popover. such engagement</ReactBootstrap.Popover>;
    //let tooltip = <ReactBootstrap.Tooltip>wow.</ReactBootstrap.Tooltip>;
    var style = {};
    if (this.props.hideTrigger) {
      style = { display: "none"};
    }

    return (
      <div>
        <div style={style}>
          <li id={this.props.id}
              style={{cursor: "pointer", fontSize: "13px"}}
              onClick={this.open}
          >
            &nbsp;&nbsp;- Create
          </li>
        </div>

        <ReactBootstrap.Modal  show={this.state.showModal} onHide={this.close}>
          <ReactBootstrap.Modal.Header closeButton>
            <h4 className="heading-text">{this.getStateFromFlux().heading}</h4>
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>
            <DashboardEditName mode={this.props.mode} dashboardId={this.props.dashboardId} />
            <DashboardEditBody mode={this.props.mode} dashboardId={this.props.dashboardId} />
            </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer>
            <DashboardEditFooter modal={this} />
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal>
      </div>
    );
  }
});
