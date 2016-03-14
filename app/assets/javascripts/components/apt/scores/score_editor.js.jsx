var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var ScoreEditor = React.createClass({
  mixins: [
    FluxMixin,
  ],
  getStateFromFlux: function() {
    return this.getFlux().store("ScoreEditorStore").getState();
  },
  handleSave: function() {
    var score = {};
    score['score'] = myDiagram.model.toJson();
    score['image'] = myDiagram.makeImageData();
    score['name'] = this.getStateFromFlux().scoreTitle;
    this.getFlux().actions.saveScore(score);
  },
  render: function() {
    return (
        <div className="editor-box">
          <EditorSubNav handleSave={this.handleSave} handleNew={this.handleNew} />
          <div className="editor-container">
            <div className="row editor-2-col">
              <div className="col-md-4 editor-pane">
                <ScoreEditorPane />
              </div>
              <div className="col-md-7 editor-views">
                <EditorTree />
              </div>
            </div>
          </div>
        </div>
      );
    }
});
