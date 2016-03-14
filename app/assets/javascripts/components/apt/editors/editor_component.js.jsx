var RouteHandler = ReactRouter.RouteHandler,
  Link = ReactRouter.Link;

var EditorComponent = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    /**
     * Load the component into the editor for update
     */
    if (this.props.params.id) {
      var editComponent = this.props.flux.store("ComponentsStore").getComponent(this.props.params.id);
      this.getFlux().actions.loadComponentUpdate(editComponent);
      this.getFlux().actions.generatePreviewData();
    }
  },
  render: function() {
    return (
      <div className="editor">
        <AppSidebar view="component" />
        <ComponentEditor />
      </div>
    );
  }
});
