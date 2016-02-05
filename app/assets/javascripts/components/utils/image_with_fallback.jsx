var ImageWithFallback = React.createClass({
  getInitialState: function () {
    return {};
  },
  errorHandler: function () {
    this.setState({ errored: true });
  },
  render: function (argument) {
    console.log(this.props.fallbackSrc)
    var src = this.state.errored ? this.props.fallbackSrc : this.props.src;

    return (<img src={src} onError={this.errorHandler}/>);
  }
});