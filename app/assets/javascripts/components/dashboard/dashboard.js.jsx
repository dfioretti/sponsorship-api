var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var Dashboard = React.createClass({
  componentWillMount: function() {
    CompaniesStore.setCurrent(this.props.params.id);
  },
  componentDidMount: function() {
    $('.modules-container').shapeshift({
      selector: ".dashboard-module",
      handle: ".drag-handle",
      align: "left",
      autoHeight: false,
      gutterX: 20,
      gutterY: 20,
      paddingX: 20,
      paddingY: 20
    });
  },
  render: function() {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="modules-box">
          <div className="modules-container">
            <GeneralFinanace />
            <HistoricalPrecedent />
            <KeySocialPosts />
            <LikelyAttackers />
            <Notes />
            <RiskAssessment />
            <RiskIndicators />
            <SocialSentiment />
          </div>
        </div>
      </div>
    );
  }
});
