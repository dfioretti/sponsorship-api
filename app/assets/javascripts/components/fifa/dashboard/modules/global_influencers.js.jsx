var GlobalInfluencers = React.createClass({
  getInitialState: function() {
    return {scrollLoaded: false, influencers: []};
  },
  componentWillMount: function() {
    this.getData();
  },
  componentWillReceiveProps: function(newProps) {
    if (this.props.hidden != newProps.hidden && !newProps.hidden && !this.state.scrollLoaded) {
      if (!this.state.wait) {
        this.setState({scrollLoaded: true});
        $('.global-influencers-list-container').jScrollPane();
      }
    }

    this.setState({wait: true}, function(){
      this.getData(newProps);
    }.bind(this));
  },
  getData: function(props) {
    var p = props ? props : this.props;

    Dispatcher.fifaGet(
      FIFAEndpoints.INFLUENCERS,
      {},
      function(data) {
        this.setState({influencers: data}, function() {
          if (!this.state.scrollLoaded && !p.hidden) {
            $('.global-influencers-list-container').jScrollPane();
            this.setState({scrollLoaded: true});
          } else if (this.state.wait) {
            if (typeof($('.global-influencers-list-container').data('jsp')) == "undefined") {
              $('.global-influencers-list-container').jScrollPane();
              this.setState({scrollLoaded: true});
            }
            this.setState({wait: false});
          } else {
            $('.global-influencers-list-container').data('jsp').destroy();
            $('.global-influencers-list-container').jScrollPane();
            $('.global-influencers-list-container').data('jsp').addHoverFunc();
          }
        }.bind(this));
      }.bind(this)
    );
  },
  renderList: function() {
    var list = $.map(this.state.influencers, function(item, i) {
      return (
        <li key={i}>
          <div className="media-image"><img src={item.profile_img}/></div>
          <div className="media-text">
            <div className="media-header">{item.name} <a href={item.profile} target="_blank">({item.handle})</a></div>
            <div>{item.bio}</div>
            <div>Following: {item.following}</div>
            <div>Followers: {item.followers}</div>
          </div>
        </li>
      );
    });
    return (
      <ul className="media-list global-influencers-list media-list-scrollable-tall global-influencers-list-container">
        {list}
      </ul>
    );
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="top_global_influencers" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <a className="expand-handle"></a>
          <div className="drag-handle"></div>
          <div className="top-title">Top Global Influencers</div>
        </div>
        <div className="main">
          {this.renderList()}
        </div>
        <div className="dashboard-module-footer">
          <h5 className="pull-left">View All Global Influencers</h5>
          <a className='pull-right btn btn-sm btn-primary img-round'>View <span className="glyphicon glyphicon-play"></span></a>
        </div>
      </div>
    );
  }
});
