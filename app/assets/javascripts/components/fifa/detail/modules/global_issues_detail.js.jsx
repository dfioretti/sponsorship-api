var GlobalIssuesDetail = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function () {
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
    this.getDetails()
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
    // probably needs to be moved to willReceiveProps as soon as Date is built in
  },
  getDetails: function () {
    Dispatcher.fifaGet(
      FIFAEndpoints.GLOBAL_ISSUES,
      {},
      function(data) {
        var chartData = this.buildChartData(data);
        // this.state.globalIssuesChartData
        this.setState({globalIssuesChartData: chartData});
      }.bind(this)
    );
  },
  buildChartData: function (data) {
    var chartData = {
      labels: [],
      datasets: [
        {
          data: [], // add volume
          backgroundColor: [], //move colors to doughnut
          hoverBackgroundColor: []
        }
      ]
    };

    var socialIssues = {};

    _.each(data, function (entry) {
      _.each(entry.social_issues, function (issue, key) {
        var parentTopic = issue.parent_topic;

        if (parentTopic) {
          if (!socialIssues[parentTopic]) {
            socialIssues[parentTopic] = 0;
          }

          socialIssues[parentTopic] += issue.volume;
         }
      });
    });

    console.log(socialIssues)

    _.each(socialIssues, function (volume, issue) {
      chartData.labels.push(issue)
      chartData.datasets[0].data.push(volume)
    });

    console.log(chartData)

    return chartData;
  },
  render: function () {
    // var data = {
    //     labels: [
    //         "Red",
    //         "Green",
    //         "Yellow"
    //     ],
    //     datasets: [
    //         {
    //             data: [300, 50, 100],
    //             backgroundColor: [
    //                 "#F7464A",
    //                 "#46BFBD",
    //                 "#FDB45C"
    //             ],
    //             hoverBackgroundColor: [
    //                 "#FF5A5E",
    //                 "#5AD3D1",
    //                 "#FFC870"
    //             ]
    //     }]
    // };

    return (
      <div className="details-container">
        <FifaDoughnutDetail moduleTitle="Top Global Issues Social Media" data={this.state.globalIssuesChartData}></FifaDoughnutDetail>
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