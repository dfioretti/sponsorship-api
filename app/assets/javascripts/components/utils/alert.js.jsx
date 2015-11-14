var Alerts = React.createClass({
  componentWillMount: function() {
    var token = PubSub.subscribe('alert.update', function(message, data){
      this.setState({
        message: data.message,
        alertType: data.alertType
      });
      setTimeout(this.removeAlert, 5000);
    }.bind(this))
    this.setState({token: token});
  },
  componentWillUnmount: function() {
    PubSub.unsubscribe(this.state.token);
  },
  removeAlert: function() {
    this.setState({
      message: null,
      alertType: null
    });
  },
  render: function() {
    var cn = "alert alert-dismissible alert-" + this.state.alertType;
    var alert = <span></span>;
    if (this.state.message && this.state.alertType) {
      alert =
        <div className={cn} role="alert">
          {this.state.message}
        </div>
    }
    return alert;
  }
});
