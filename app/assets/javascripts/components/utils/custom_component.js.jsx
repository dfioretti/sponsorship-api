var Link = ReactRouter.Link;

var CustomComponent = React.createClass({
  mixins: [
    jScrollpaneMixin,
    ChartTooltipHandler
  ],
  getInitialState: function() {
    return {};
  },
  renderBarChart: function() {
    console.log("Rendering Bar Chart");
    return (
      <BarChart />
    );
  },
  renderLineChart: function() {
    console.log("Rendering Line Chart");
    return (
      <LineChart go="yes" />
    );
  },
  renderValueList: function() {
    console.log("Rendering Value List");

    return (
        <ValueList />
    );
  },
  renderBarList: function() {
    console.log("Rendering Bar List");

    return (
      <BarList />
    );
  },
  renderContent: function() {
    switch (this.props.type) {
      case 'barChart':
        return this.renderBarChart();
        break;
      case 'lineChart':
        return this.renderLineChart();
        break;
      case 'valueList':
        return this.renderValueList();
        break;
      case 'barList':
        return this.renderBarList();
        break;
    }
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};

      return (
        <div id="custom_component" className="dashboard-module" style={hiddenStyle}>
            <div className="top">
              <div className="drag-handle"></div>
              <div className="top-title">{this.props.title}</div>
            </div>
            <div className="main">
                {this.renderContent()}
            </div>
        </div>
      )
  }
});
