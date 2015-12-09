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

    var opts = {
      lines: 9, // The number of lines to draw
      length: 13, // The length of each line
      width: 16, // The line thickness
      radius: 52, // The radius of the inner circle
      scale: 1, // Scales overall size of the spinner
      corners: 0.5, // Corner roundness (0..1)
      color: 'white', // #rgb or #rrggbb or array of colors
      opacity: 0.25, // Opacity of the lines
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      className: 'spinner', // The CSS class to assign to the spinner
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      position: 'absolute', // Element positioning
    }
    var target = document.getElementById('spinner')
    var spinner = new Spinner(opts).spin(target);
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
      main = <div id="spinner"></div>
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
