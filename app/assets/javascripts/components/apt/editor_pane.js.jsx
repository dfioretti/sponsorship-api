var EditorPane = React.createClass({
  mixins: [FluxMixin],
  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("ComponentEditorStore").getState();
  },
  renderPaneForState: function() {
    switch(this.getStateFromFlux().editorPane) {
      case 'general':
        return <GeneralPane />;
        break;
      case 'chartType':
        return <ChartTypePane />;
        break;
      case 'appearance':
        return <AppearancePane />;
        break;
      case 'data':
        return <DataPane />;
      case 'configuration':
        return <ConfigurationPane />;
        break;
    }
  },
  render: function() {
    return (
      <div>
        {this.renderPaneForState()}
      </div>
    );
  },
});
