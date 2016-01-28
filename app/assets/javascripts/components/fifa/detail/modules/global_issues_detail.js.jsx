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
    var data = {
        labels: [
            "Red",
            "Green",
            "Yellow"
        ],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#F7464A",
                    "#46BFBD",
                    "#FDB45C"
                ],
                hoverBackgroundColor: [
                    "#FF5A5E",
                    "#5AD3D1",
                    "#FFC870"
                ]
        }]
    };

    return (
      <div className="details-container">
        <FifaDoughnutDetail moduleTitle="Top Global Issues Social Media" data={data} chartOptions={this.state.doughnutChartOptions}></FifaDoughnutDetail>
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