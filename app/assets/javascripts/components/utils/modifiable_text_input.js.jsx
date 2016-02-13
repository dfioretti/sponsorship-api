var ModifiableTextInput = React.createClass({
  getInitialState: function () {
    return {};
  },
  componentWillReceiveProps: function (props) {
    this.setState({value: props.value});
  },
  updateSearchInput: function (e) {
    var value = e.target.value;

    this.setState({
      value: value
    }, function () {
      this.props.handleInputUpdate(value);
    });
  },
  render: function (argument) {
    return (
      <input className={this.props.classNames} placeholder={this.props.placeholder} value={this.state.value} onChange={this.updateSearchInput} />
    );
  }
});