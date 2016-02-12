var GlobalInfluencersDetail = React.createClass({
  getInitialState: function() {
    return {loaded: false, influencers: []};
  },
  componentDidMount: function () {
    this.getDetails();
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
  getDetails: function () {
    Dispatcher.fifaGet(
      FIFAEndpoints.INFLUENCERS,
      {
        issue_tags: true,
        top_news: 3
      },
      function(data) {
        this.setState({influencers: data}, function() {
        }.bind(this));
      }.bind(this)
    );
  },
  renderList: function () {
    return _.map(this.state.influencers, function (item, i) {
      return (<InfluencerCard key={i} item={item} />);
    });
  },
  render: function () {
    return (
      <div className="details-container">
        {this.renderList()}
      </div>
    );
  }
});