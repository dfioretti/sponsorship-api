var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link,
    Navigation = ReactRouter.Navigation;

var App = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    return {loaded: false}
  },
  componentDidMount: function() {
    PubSub.subscribe('auth.signIn.success', function(ev, user) {
      this.transitionTo('/choose_company');
    }.bind(this));
    PubSub.subscribe('auth.emailRegistration.success', function(ev, user) {
      this.transitionTo('/choose_company');
    }.bind(this));
    PubSub.subscribe('auth.signOut.success', function(ev, user) {
      this.transitionTo('/account_login');
      CompaniesStore.setCurrent();
    }.bind(this));

    $.auth.validateToken()
      .then(function(user) {
        this.setState({loaded: true});
      }.bind(this))
      .fail(function(resp) {
        this.setState({loaded: true});
        if (LoggedOutPaths.indexOf(window.location.pathname) == -1) {
          this.transitionTo('/account_login');
        }
      }.bind(this));
  },
  setTitle: function(title) {
    this.setState({title: title});
  },
  renderAlerts: function() {
    return <Alerts />;
  },
  renderNav: function() {
    return <Nav {...this.props} title={this.state.title}/>;
  },
  render: function() {
    var cn = "logged-out",
      main;

    if (this.state.loaded) {
      main = <RouteHandler {...this.props} setTitle={this.setTitle}/>
    } else {
      main = <div>Loading...</div>
    }
    return (
      <div id="main" className={cn}>
        {this.renderNav()}
        {this.renderAlerts()}
        {main}
      </div>
    );
  }
});
