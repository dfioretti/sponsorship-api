var NewsItem = React.createClass({
  _ellipsis: function (text, maxLength) {
    return text.length < maxLength ? text : text.slice(0,maxLength - 3) + '...';
  },
  shortenedFullText: function () {
    var text = this.props.item.full_text;
    return this._ellipsis(text, 144);
  },
  rootDomain: function () {
    return this.link.match("/http(s?):\/\/(.*)\//")[0];
  },
  clearbitSrc: function () {
    if (this.link) {
      return 'https://logo.clearbit.com/' + this.rootDomain();
    } else {
      return 'http://placehold.it/100x100';
    }
  },
  render: function () {
    return (
      <li>
        <div className="media-image"><img src={this.clearbitSrc()}/></div>
        <div className="media-text">
          <div className="media-header media-break-text"><a href={this.props.item.link} target="_blank">{this.props.item.title}</a></div>
          <div className="media-subheader"><span>{moment(this.props.item.date).format('MMMM Do, YYYY')}</span></div>
          <div className="media-break-text">{this.shortenedFullText()}</div>
        </div>
      </li>
    );
  }
});"(TeneoStrategy,Topic,Link,Headline,Translated Headline,StumbleUpon,Reddit,Facebo"