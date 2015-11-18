var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var Dashboard = React.createClass({
  componentWillMount: function() {
    CompaniesStore.setCurrent(this.props.params.id);
  },
  render: function() {
    return <div>Dashboard</div>;
  }
});
