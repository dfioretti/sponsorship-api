var ModifiableTextInput = React.createClass({
  getInitialState: function () {
    return {};
  },
  componentWillMount: function () {
    this.handleSearchUpdate = _.debounce(function (value) {
      this.props.handleInputUpdate(value);
    }.bind(this), 200);
  },
  componentWillReceiveProps: function (props) {
    this.setState({value: props.value});
  },
  updateSearchInput: function (e) {
    var value = e.target.value;
    var component = this;

    e.persist();
    this.handleSearchUpdate(value);

    this.setState({
      value: value
    });
  },
  render: function (argument) {
    return (
      <input className={this.props.classNames} placeholder={this.props.placeholder} value={this.state.value} onChange={this.updateSearchInput} />
    );
  }
});