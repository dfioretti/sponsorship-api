var Auth = {
  getInitialState: function() {
    return {loaded: false}
  },
  componentDidMount: function() {
    $.auth.validateToken()
      .then(function(user) {
        this.setState({loaded: true});
      }.bind(this))
      .fail(function(resp) {
        this.transitionTo('/account_login');
      }.bind(this));
  }
};
