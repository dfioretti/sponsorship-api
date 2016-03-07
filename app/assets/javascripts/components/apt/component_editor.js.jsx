var RouteHandler = ReactRouter.RouteHandler,
  Link = ReactRouter.Link;

var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ComponentEditor = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ComponentStore")],

  getInitialState: function() {
    return {};
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("ComponentStore").getState();
  },

  renderSubNav: function() {
    return (
      <div className="subnav">

      </div>
    );
  },
  renderViews: function () {
    return (
      <div className="">
        <div className="editor-preview">
        </div>
        <div className="editor-data">
        </div>
      </div>
    );

  },
  renderPreview: function() {
    return (
      <div className="editor-preview">
        <div className="preview-title">
          Component Preview
        </div>
        <div className="module-preview">
          <div className="ptop">
            <div className="pdrag-handle">
            </div>
            <div className="ptop-title">
              Component Title
            </div>
          </div>
        </div>
      </div>
    );
  },

  render: function() {
    // #FAFBFD - color of dashboard in detail-module
    // $dark-blue - color of regualr dash
    //{this.renderInput()}
    //                 {this.renderData()}

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
                {this.renderPreview()}
                <EditorData />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
