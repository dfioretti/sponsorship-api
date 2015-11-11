var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var App = React.createClass({

  render: function() {
    return (
      <div id="main">
        <Nav />
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});
