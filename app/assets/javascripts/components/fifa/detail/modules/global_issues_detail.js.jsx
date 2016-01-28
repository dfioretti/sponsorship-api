var GlobalIssuesDetail = React.createClass({
  getInitialState: function() {
    return {};
    // return {loaded: false, influencers: []};
  },
  componentDidMount: function () {
    // this.getDetails();
    $('.details-container').shapeshift({
      selector: ".detail-module",
      handle: ".drag-handle",
      align: "left",
      autoHeight: false,
      gutterX: 20,
      gutterY: 20,
      paddingX: 20,
      paddingY: 20
    });
  },
  componentDidUpdate: function () {
    $('.details-container').shapeshift({
      selector: ".detail-module",
      handle: ".drag-handle",
      align: "left",
      autoHeight: false,
      gutterX: 20,
      gutterY: 20,
      paddingX: 20,
      paddingY: 20
    });
  },
  getDetails: function () {
    // Dispatcher.fifaGet(
    //   FIFAEndpoints.INFLUENCERS,
    //   {},
    //   function(data) {
    //     this.setState({influencers: data}, function() {
    //     }.bind(this));
    //   }.bind(this)
    // );
  },
  render: function () {
    return (
      <div className="details-container">
        <FifaDoughnutDetail moduleTitle="Top Global Issues Social Media" data={this.state.global_issues} chartOptions={this.state.doughnutChartOptions}></FifaDoughnutDetail>
        <div id="global-issues-social" className="detail-module detail-chart">
        </div>
        <div id="global-issues-media" className="detail-module detail-chart">
        </div>
        <div id="global-issues-volume" className="detail-module detail-chart">
        </div>
      </div>
    );
  }
});