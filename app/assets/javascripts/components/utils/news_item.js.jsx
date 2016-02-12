var NewsItem = React.createClass({
  _defaultLogoSrc: ASSET_PATHS.IMAGES.DEFAULT_NEWS_LOGO,
  _ellipsis: function (text, maxLength) {
    return text.length < maxLength ? text : text.slice(0,maxLength - 3) + '...';
  },
  shortenedFullText: function () {
    var text = this.props.item.full_text;
    return this._ellipsis(text, 144);
  },
  rootDomain: function () {
    var domain;
    var link = this.props.item.link;
    if (!link) return;

    domain = link.replace(RegExp(/http(s?):\/\//), '').split('/')[0];
    return domain;
  },
  clearbitSrc: function () {
    logoSrc = this._defaultLogoSrc;

    if (this.props.item.link && this.rootDomain()) {
      logoSrc = 'https://logo.clearbit.com/' + this.rootDomain();
    }

    return logoSrc;
  },
  render: function () {
    return (
      <li>
        <div className="media-image"><ImageWithFallback src={this.clearbitSrc()} fallbackSrc={this._defaultLogoSrc} /></div>
        <div className="media-text">
          <div className="media-header media-header-limit-2-lines media-break-text"><a href={this.props.item.link} target="_blank">{this.props.item.title}</a></div>
          <div className="media-subheader"><span>{moment(this.props.item.date).format('MMMM Do, YYYY')}</span></div>
          <div className="media-break-text">Total shares: {_.get(this.props.item, 'latest_shares.total_shares') || 0}  <span className="news-separator">|</span>  Velocity: {this.props.item.shares_since_last || 0}</div>
          <div className="media-break-text">{this.shortenedFullText()}</div>
        </div>
      </li>
    );
  }
});