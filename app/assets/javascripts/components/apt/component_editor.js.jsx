StoreWatchMixin = Fluxxor.StoreWatchMixin;

var EditorPreview = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("EditorPreviewStore")],

  getStateFromFlux: function() {
    return flux.store("EditorPreviewStore").getState();
  },
  render: function() {
    var component = this.getStateFromFlux().component;
    if (component == null) {
      component = flux.store("ComponentEditorStore").getPreview();
    }
    return (
      <div className="editor-preview">
        <div className="preview-heading">
          Component Preview
        </div>
        <div className="preview-component">
          <DynamicComponent component={component}  />
        </div>
      </div>
    );
  }
});


var ComponentEditor = React.createClass({
  mixins: [FluxMixin],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("ComponentEditorStore").getState();
  },
  renderPreview: function() {
    var component = this.getFlux().store("ComponentEditorStore").getPreview();
    return (
      <div className="editor-preview">
        <EditorPreview component={component} />
      </div>
    );
  },

  render: function() {
    /* TODO: clean up these styles */
    var component = this.getFlux().store("ComponentEditorStore").getPreview();
    return (
      <div className="editor-box">
        <EditorSubNav />
        <div className="editor-container">
          <div className="container nospace">
            <div className="row editor-2-col">
              <div className="col-md-5 editor-pane">
                <EditorPane />
              </div>
              <div className="col-md-6 editor-views">
                <EditorPreview component={component} />
                <EditorData />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
