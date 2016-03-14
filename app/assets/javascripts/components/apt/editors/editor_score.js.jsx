var RouteHandler = ReactRouter.RouteHandler,
  Link = ReactRouter.Link;


var EditorScore = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div className="editor">
        <AppSidebar view="score" />
        <ScoreEditor params={this.props.params} />
      </div>
    );
  }
});
