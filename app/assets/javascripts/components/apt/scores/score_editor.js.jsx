var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var ScoreEditor = React.createClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin("ScoreEditorStore")
  ],
  getStateFromFlux: function() {
    return this.getFlux().store("ScoreEditorStore").getState();
  },
  handleSave: function() {
    // editing or new
    var score = this.getStateFromFlux().score;
    if (!score) { score = {} };

    // score data - should move this to store
    score['score'] = myDiagram.model.toJson();
    score['image'] = myDiagram.makeImageData();
    score['name'] = this.getStateFromFlux().scoreTitle;

    // update existing, create new
    if (score.id) {
      this.getFlux().actions.updateScore(score);
    } else {
      this.getFlux().actions.saveScore(score);
    }
  },
  render: function() {
    return (
        <div className="editor-box">
          <EditorSubNav handleSave={this.handleSave}
                        handleNew={this.handleNew}
                        message={this.getStateFromFlux().message}
          />
          <div className="editor-container">
            <div className="row editor-2-col">
              <div className="col-md-4 editor-pane">
                <ScoreEditorPane />
              </div>
              <div className="col-md-7 editor-views">
                <EditorTree params={this.props.params}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
});
