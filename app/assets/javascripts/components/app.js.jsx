var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link,
    Navigation = ReactRouter.Navigation;

var App = React.createClass({
  mixins: [ Navigation ],
  componentDidMount: function() {
    PubSub.subscribe('auth.signIn.success', function(ev, user) {
      this.transitionTo('/choose_company');
    }.bind(this));
    PubSub.subscribe('auth.signUp.success', function(ev, user) {
      this.transitionTo('/choose_company');
    }.bind(this));
    PubSub.subscribe('auth.signOut.success', function(ev, user) {
      this.transitionTo('/account_login');
    }.bind(this));
  },
  renderAlerts: function() {
    return <Alerts />;
  },
  renderNav: function() {
    return <Nav {...this.props} />;
  },
  render: function() {
    var cn = "logged-out"

    return (
      <div id="main" className={cn}>
        {this.renderNav()}
        {this.renderAlerts()}
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});
