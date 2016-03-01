var GenericValueListItem = React.createClass({
  getInitialState: function() {
    return {loaded: false};
  },
  componentWillMount: function() {
    this.itemId = uuid.v4();
  },
  componentDidMount: function() {
    this.animate(this.props);
  },
  componentWillReceiveProps: function(newProps) {
    if(newProps.value !== this.props.value) {
      this.animate(newProps);
    }
  },
  animate: function(newProps) {
    var itemId = "#value-list-item-" + newProps.key;
    $("#" + this.itemId).effect("highlight", {"color": "#50e3c2"}, 1500, function() {
      this.setState({loaded: true});
    }.bind(this));
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.value != this.props.value;
  },
  render: function() {
    //var itemId = "value-list-item-" + this.props.key;
    return (
      <li>
        <div className="stat-image">
          <img src={this.props.statImage} />
        </div>
        <div className="stat-header">{this.props.statHeader}</div>
        <div id={this.itemId} className="stat-metric">{this.props.statMetric}</div>
      </li>
    )
  }

});
