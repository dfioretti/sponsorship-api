var Link = ReactRouter.Link;

var CustomComponent = React.createClass({
  mixins: [
    ChartTooltipHandler
  ],
  getInitialState: function() {
    return {};
  },
  renderBarChart: function() {
    return (
      <BarChart />
    );
  },
  renderLineChart: function() {
    return (
      <LineChart />
    );
  },
  renderDoughnutChart: function() {
    return (
      <RoundChart type="doughnut" />
    );
  },
  renderPieChart: function() {
    return (
      <RoundChart type="pie" />
    );
  },
  renderValueList: function() {
    return (
        <DataList type="value" componentId="10"/>
    );
  },
  renderBarList: function() {
    return (
      <DataList type="bar" componentId="10"/>
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
