var GlobalInfluencersDetail = React.createClass({
  getInitialState: function() {
    return {loaded: false, influencers: []};
  },
  componentWillReceiveProps: function (props) {
    this.getDetails(props);
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
      paddingY: 20,
      colWidth: 400
    });
  },
  getDetails: function (props) {
    Dispatcher.fifaGet(
      FIFAEndpoints.INFLUENCERS,
      {
        start_date: moment(props.startDate).format('YYYY-MM-DD'),
        end_date: moment(props.endDate).format('YYYY-MM-DD'),
        issue_tags: true,
        top_news: 3
      },
      function(data) {
        this.setState({influencers: data}, function() {
        }.bind(this));
      }.bind(this)
    );
  },
  renderSubnav: function() {
    var link = '/fifa/dashboard';

    return (
      <div className="details-subnav">
        <div className="details-left-nav">
          <Link to={link}><div className="back-icon"></div></Link>
          <div className="to-dashboard">Top Global Influencers</div>
        </div>
      </div>
    );
  },
  renderList: function () {
    return _.map(this.state.influencers, function (item, i) {
      return (<InfluencerCard key={i} item={item} />);
    });
  },
  render: function () {
    return (
      <div style={{height: "100%"}}>
        {this.renderSubnav()}
        <div className="details-box">
          <div className="details-container">
            {this.renderList()}
          </div>
        </div>
      </div>
    );
  }
});