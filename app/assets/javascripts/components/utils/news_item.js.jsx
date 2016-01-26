var NewsItem = React.createClass({
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
    var logoSrc = 'http://placehold.it/100x100';

    // console.log(this.props.item.link)

    if (this.props.item.link && this.rootDomain()) {
      // logoSrc = 'https://logo.clearbit.com/' + this.rootDomain();
      logoSrc = 'https://logo.clearbit.com/' + this.rootDomain();
    }

    return logoSrc;
  },
  render: function () {
    return (
      <li>
        <div className="media-image"><ImageWithFallback src={this.clearbitSrc()} fallbackSrc="http://placehold.it/100x100" /></div>
        <div className="media-text">
          <div className="media-header media-header-limit-2-lines media-break-text"><a href={this.props.item.link} target="_blank">{this.props.item.title}</a></div>
          <div className="media-subheader"><span>{moment(this.props.item.date).format('MMMM Do, YYYY')}</span></div>
          <div className="media-break-text">{this.shortenedFullText()}</div>
        </div>
      </li>
    );
  }
});"(TeneoStrategy,Topic,Link,Headline,Translated Headline,StumbleUpon,Reddit,Facebo"