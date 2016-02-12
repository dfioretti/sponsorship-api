var Link = ReactRouter.Link;

var GlobalInfluencers = React.createClass({
  mixins: [jScrollpaneMixin],
  getInitialState: function() {
    return {scrollLoaded: false, influencers: []};
  },
  componentWillReceiveProps: function(newProps) {
    this.setState({wait: true}, function(){
      this.getData(newProps);
    }.bind(this));
  },
  getData: function(props) {
    var p = props ? props : this.props;

    var params = {
      start_date: moment(p.startDate).format('YYYY-MM-DD'),
      end_date: moment(p.endDate).format('YYYY-MM-DD')
    };

    Dispatcher.fifaGet(
      FIFAEndpoints.INFLUENCERS,
      params,
      function(data) {
        this.setState({influencers: data});
      }.bind(this)
    );
  },
  renderList: function() {
    var list = $.map(this.state.influencers, function(item, i) {
      return (
        <li key={i}>
          <div className="media-image"><img src={item.profile_img}/></div>
          <div className="media-text">
            <div className="media-header">{item.name} <a href={item.profile} target="_blank">(@{item.handle})</a></div>
            <div>{item.bio}</div>
            <div>Following: {_.toShortenedNum(item.following)}</div>
            <div>Followers: {_.toShortenedNum(item.followers)}</div>
          </div>
        </li>
      );
    });
    return (
      <div className="media-list-scrollable-tall global-influencers-list-container" onScroll={this.toggleScrollActive} ref="jScrollContainer">
        <ul className="media-list global-influencers-list">
          {list}
        </ul>
      </div>
    );
  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    var detailLink = '/fifa/dashboard/global_influencers';

    return (
      <div id="top_global_influencers" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <Link to={detailLink} className="expand-handle"></Link>
          <div className="drag-handle"></div>
          <div className="top-title">Top Global Influencers</div>
        </div>
        <div className="main">
          {this.renderList()}
        </div>
      </div>
    );
  }
});
