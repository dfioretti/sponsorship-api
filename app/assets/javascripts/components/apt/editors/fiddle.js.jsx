var RouteHandler = ReactRouter.RouteHandler,
  Link = ReactRouter.Link;

var Fiddle = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <div className="editor">
        <AppSidebar />
      </div>
    );
  }
});
