var GlobalInfluencersDetail = React.createClass({
  getInitialState: function() {
    return {loaded: false, influencers: []};
  },
  componentWillReceiveProps: function (props) {
    this.setState({loaded: false}, function () {
      this.startSpin();
      this.getDetails(props);
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
      paddingY: 20,
      colWidth: 400
    });
  },
  startSpin: function() {
    var opts = {
      lines: 9, // The number of lines to draw
      length: 13, // The length of each line
      width: 16, // The line thickness
      radius: 52, // The radius of the inner circle
      scale: 1, // Scales overall size of the spinner
      corners: 0.5, // Corner roundness (0..1)
      color: '#738694', // #rgb or #rrggbb or array of colors
      opacity: 0.25, // Opacity of the lines
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      className: 'spinner', // The CSS class to assign to the spinner
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      position: 'absolute', // Element positioning
    };
    var target = ReactDOM.findDOMNode(this.refs.spinner);
    var spinner = new Spinner(opts).spin(target);
    this.setState({spinner: spinner});
  },
  stopSpin: function() {
    if (this.state.spinner && this.state.spinner.el) {
      this.state.spinner.el.remove();
      this.setState({spinner: null});
    }
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
        this.stopSpin();
        this.setState({influencers: data, loaded: true}, function() {
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
        <div className="details-right-nav">
          <div className="filters">
            <input type="text" className="filters-search-input" placeholder="Search Influencers" />
            <div className="filter value-filter">Issues<span className="caret"></span></div>
            <div className="filter severity-filter">Filter by Recency<span className="caret"></span></div>
            <div className="filter severity-filter">Filter by Reach<span className="caret"></span></div>
          </div>
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
    var main;

    if (this.state.loaded) {
      main = this.renderList();
    } else {
      main = (<div className="chart-spinner" ref="spinner"></div>)
    }

    return (
      <div style={{height: "100%"}}>
        {this.renderSubnav()}
        <div className="details-box">
          <div className="details-container">
            {main}
          </div>
        </div>
      </div>
    );
  }
});