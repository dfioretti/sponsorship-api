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
  renderData: function() {
    return (
      <div className="editor-data">
      </div>
    );
  },
  renderInput: function() {
    return (
      <div className="content-input">
        <div className="general-input">
          <div className="input-heading">
            General
          </div>
          <div className="content-main">
            <div className="form-group">
              <label>Component Title</label>
              <input type="text" id="component_title" className="form-control" placeholder="Enter Title" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea></textarea>
            </div>
          </div>
        </div>
        <div className="type-input none">
          <div className="input-heading">
            Chart Type
          </div>
          <div className="content-main">
            <div className="form-group">
              <label>Series</label>
              <br />
              <img src="/edit/chart.png" />
              <img src="/edit/chart.png" />
              <br />
              <p style={{paddingTop: "10px"}}>
                A bar or line chart can display multiple data points or
                data for multiple items over time.
              </p>
            </div>
            <div className="form-group">
              <label>Data List</label>
              <br />
              <img src="/edit/chart.png" />
              <img src="/edit/chart.png" />
                <br />
                <p style={{paddingTop: "10px"}}>
                  A data list can show multiple data points
                  for the same or different properties.
                </p>
            </div>
            <div className="form-group">
              <label>Circular</label>
              <br />
              <img src="/edit/chart.png" />
              <img src="/edit/chart.png" />
              <p style={{paddingTop: "10px"}}>
                A pie or circular chart can show a ratio
                of different data points.
              </p>
            </div>
          </div>
        </div>
        <div className="config-input none">
          <div className="input-heading">
            Configuration
          </div>
          <div className="content-main none">
            <div className="form-group">
            </div>
          </div>
        </div>
        <div className="appearance-input none">
          <div className="input-heading">
            Appearance
          </div>
          <div className="content-main">
            <div className="form-group">
            </div>
          </div>
        </div>
        <div className="data-input none">
          <div className="input-heading">
            Data
          </div>
          <div className="content-main">
            <div className="form-group">
            </div>
          </div>
        </div>
      </div>
    )
  },
  render: function() {
    // #FAFBFD - color of dashboard in detail-module
    // $dark-blue - color of regualr dash
    //{this.renderInput()}
    //                 {this.renderData()}

    return (
      <div className="editor-box">
        {this.renderSubNav()}
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
