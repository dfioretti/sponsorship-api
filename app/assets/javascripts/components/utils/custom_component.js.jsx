var Link = ReactRouter.Link;

var CustomComponent = React.createClass({
  mixins: [
    ChartTooltipHandler
  ],
  componentWillMount: function() {
    console.log("component will mount");
    Dispatcher.componentGet(
      1,
      function(data) {
        Dispatcher.componentDataGet(
          1,
          function(data) {
            console.log(data);
          }
        )
      }.bind(this)
    );
  },
  getInitialState: function() {
    return {};
  },
  renderBarChart: function() {
    return (
      <BarChart {...this.props} />
    );
  },
  renderLineChart: function() {
    return (
      <LineChart {...this.props} />
    );
  },
  renderDoughnutChart: function() {
    return (
      <RoundChart {...this.props} type="doughnut" />
    );
  },
  renderPieChart: function() {
    return (
      <RoundChart {...this.props} type="pie" />
    );
  },
  renderValueList: function() {
    return (
        <DataList {...this.props} type="value" componentId="10"/>
    );
  },
  renderBarList: function() {
    return (
      <DataList {...this.props} type="bar" componentId="10"/>
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
      case 'doughnutChart':
        return this.renderDoughnutChart();
        break;
      case 'pieChart':
        return this.renderPieChart();
        break;
    }
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    // old id was teneo_rep_score
      return (
        <div id="top_global_issues" className="dashboard-module" style={hiddenStyle}>
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
