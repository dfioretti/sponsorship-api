var News = React.createClass({
  getInitialState: function () {
    return {scrollLoaded: false, news: []};
  },
  componentWillMount: function() {
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
        }, function () {
          // if (!self.state.scrollLoaded) {
          //   $('#top-news').jScrollPane({contentWidth: '0px'});
          //   self.setState({scrollLoaded: true});
          // } else if (self.state.wait) {
          //   if (typeof($('#top-news').data('jsp')) == "undefined") {
          //     $('#top-news').jScrollPane({contentWidth: '0px'});
          //     self.setState({scrollLoaded: true});
          //   }
          //   self.setState({wait: false});
          // } else {
          //   $('#top-news').data('jsp').destroy();
          //   $('#top-news').jScrollPane({contentWidth: '0px'});
          //   $('#top-news').data('jsp').addHoverFunc();
          // }
        });

      }.bind(this)
    );
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
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="top_news" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Top News</div>
        </div>
        <div className="main">
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
