var GlobalIssues = React.createClass({
  getInitialState: function() {
    return {scrollLoaded: false, issues: []};
  },
  componentWillMount: function() {
    this.getData();
  },
  componentWillReceiveProps: function(newProps) {
    if (this.props.hidden != newProps.hidden && !newProps.hidden && !this.state.scrollLoaded) {
      if (!this.state.wait) {
        this.setState({scrollLoaded: true});
        $('.global-issues-list-container').jScrollPane();
      }
    }

    this.setState({wait: true}, function(){
      this.getData(newProps);
    }.bind(this));
  },
  getData: function(props) {
    var p = props ? props : this.props;

    Dispatcher.fifaGet(
      FIFAEndpoints.GLOBAL_ISSUES,
      {
        start_date: moment(p.startDate).format('YYYY-MM-DD'),
        end_date: moment(p.endDate).format('YYYY-MM-DD')
      },
      function(data) {
        // (TODO) Not sure if this is the correct data...
        // Need to check what data is supposed to be displayed here
        var
        issues = [],
        today = data[0].aggregate_issues,
        yesterday = data[1].aggregate_issues;

        for (var key in today) {
          var trend = 0;
          if (today[key].sentiment > yesterday[key].sentiment) {
            trend = 1;
          }
          if (today[key].sentiment < yesterday[key].sentiment) {
            trend = -1;
          }
          issues.push({
            header: key,
            score: today[key].sentiment,
            trend: trend
          });
        }

        this.setState({issues: issues}, function() {
          if (!this.state.scrollLoaded && !p.hidden) {
            $('.global-issues-list-container').jScrollPane();
            this.setState({scrollLoaded: true});
          } else if (this.state.wait) {
            if (typeof($('.global-issues-list-container').data('jsp')) == "undefined") {
              $('.global-issues-list-container').jScrollPane();
              this.setState({scrollLoaded: true});
            }
            this.setState({wait: false});
          } else {
            $('.global-issues-list-container').data('jsp').destroy();
            $('.global-issues-list-container').jScrollPane();
            $('.global-issues-list-container').data('jsp').addHoverFunc();
          }
        }.bind(this));
      }.bind(this)
    );
  },
  renderList: function() {
    var list = $.map(this.state.issues, function(item, i) {
      var trendCN = "trend-image ";
      if (item.trend === 1) {
        trendCN += "up";
      } else if (item.trend === -1) {
        trendCN += "down";
      } else {
        trendCN += "no-change";
      }

      return (
        <li key={i}>
          <div className="trend-score">{item.score}</div>
          <div className={trendCN}></div>
          <div className="trend-text">
            <div className="trend-header">{item.header}</div>
            <div className="trend-subheader">{item.subheader}</div>
          </div>
        </li>
      );
    });
    return (
      <div className="global-issues-list-container">
        <ul className="trend-list global-issues-list">
          {list}
        </ul>
      </div>
    );
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="top_global_issues" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <a className="expand-handle"></a>
          <div className="drag-handle"></div>
          <div className="top-title">Top Global Issues</div>
        </div>
        <div className="main">
          {this.renderList()}
        </div>
      </div>
    );
  }
});
