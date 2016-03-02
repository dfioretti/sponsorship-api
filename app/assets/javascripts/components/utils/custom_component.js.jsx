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
        console.log("Data!" + data);
        this.setState({ componentLoaded: true, component: data });
    }.bind(this));

    Dispatcher.componentDataGet(
      1,
      function(data) {
        console.log("Data 2!" + data);
        this.setState({dataLoaded: true, componentData: data});
    }.bind(this));
  },
  getInitialState: function() {
    return { componentLoaded: false, dataLoaded: false};
  },
  renderBarChart: function() {
    return (
      <BarChart {...this.props} />
    );
  },
  renderLineChart: function() {
    return (
      <LineChart {...this.props} chartData={this.state.componentData} componentData={this.state.component} />
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
    if (this.state.dataLoaded && this.state.componentLoaded) {
      console.log("going to render content...");
      switch (this.state.component.view) {
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
    }
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    if (this.state.dataLoaded && this.state.componentLoaded) {
      return (
        <div id="teneo_rep_score" className="dashboard-module" style={hiddenStyle}>
            <div className="top">
              <div className="drag-handle"></div>
              <div className="top-title">{this.state.component.name}</div>
            </div>
            {this.renderContent()}
        </div>
      );
    } else {
      return (
        <div className="dashboard-module"></div>
      );
    }
  }
});
