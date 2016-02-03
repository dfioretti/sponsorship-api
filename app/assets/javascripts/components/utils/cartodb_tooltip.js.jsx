var CartodbTooltip = React.createClass({
  render: function() {
    if (!this.props.tooltip) return;
    var styles = this.props.tooltip.styles;

    return(
      <div id="cartodb-tooltip" style={styles}>
        {this.props.children}
        <div className="arrow-down"></div>
      </div>
    );
  }
});
