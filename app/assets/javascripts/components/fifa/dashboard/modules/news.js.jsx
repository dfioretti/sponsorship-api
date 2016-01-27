var News = React.createClass({
  getInitialState: function () {
    return {scrollLoaded: false, news: [], activeFilter: "date" };
  },
  componentDidMount: function() {
    this.getData({
      start_date: moment(this.props.startDate).format('YYYY-MM-DD'),
      end_date: moment(this.props.endDate).format('YYYY-MM-DD')
    });
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({news: []});

    this.getData({
      start_date: moment(newProps.startDate).format('YYYY-MM-DD'),
      end_date: moment(newProps.endDate).format('YYYY-MM-DD')
    });
  },
  orderBy: function (name, customEvaluator) {
    var orderedItems = _.sortBy(this.state.news, function (item) {
      if (_.isFunction(customEvaluator)) {
        return customEvaluator(item);
      } else {
        return _.get(item, name);
      }
    });

    this.setState({news: orderedItems.reverse(), activeFilter: name});
  },
  getData: function(params) {
    var self = this;

    Dispatcher.fifaGet(
      FIFAEndpoints.NEWS,
      params,
      function(data) {
        var news = $.map(data.reverse(), function (item) {
          item.id = uuid.v4();
          return item;
        });

        this.setState({
          news: news
        });

      }.bind(this)
    );
  },
  getFilterClasses: function (filterName) {
    var c = "filter";

    if (this.state.activeFilter === filterName) {
      c += " filter-active";
    }
    return c;
  },
  renderList: function () {
    var list = $.map(this.state.news, function (item, index) {
      return(
        <NewsItem key={item.id} item={item} />
      );
    });

    return (
      <ul id="top-news" className="media-list text-list media-list-scrollable-tall">
        {list}
      </ul>
    );
  },
  render: function() {
    var orderByDateEvaluator = function (item) {
      return new Date(item.date)
    };

    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="top_news" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Top News</div>
        </div>
        <div className="main">
          <div className="filters media-list-filters">
            <div className={this.getFilterClasses('date')} onClick={this.orderBy.bind(this, 'date', orderByDateEvaluator)}>Most Recent <span className="caret"></span></div>
            <div className={this.getFilterClasses('latest_shares.total_shares')} onClick={this.orderBy.bind(this, 'latest_shares.total_shares')}>Most Shared <span className="caret"></span></div>
            <div className={this.getFilterClasses('shares_since_last')} onClick={this.orderBy.bind(this, 'shares_since_last')}>Most Viral <span className="caret"></span></div>
          </div>
          {this.renderList()}
        </div>
        <div className="dashboard-module-footer">
          <h5 className="pull-left">View More Top News Articles</h5>
          <a className='pull-right btn btn-sm btn-primary img-round'>View <span className="glyphicon glyphicon-play"></span></a>
        </div>
      </div>
    );
  }
});
