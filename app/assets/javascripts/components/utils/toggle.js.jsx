var Toggle = React.createClass({
  handleToggle: function(values, e) {
    this.props.handleToggle(values, e);
  },
  render: function() {
    var cn = "toggle " + this.props.toggleValue;
    var values = {
      value: this.props.toggleValue,
      module: this.props.module
    };
    return (
      <div className={cn} onClick={this.handleToggle.bind(this, values)}>
        <div className="handle"></div>
      </div>
    );
  }
});
