var InsightListItem = React.createClass({

  getIconClass: function () {
    var itemFileExtension = _.last(this.props.item.attachment_name.split('.')).toLowerCase();
    var iconClass = 'file-default';

    if (itemFileExtension.match('pdf')) {
      iconClass = 'file-pdf';
    } else if (itemFileExtension.match('xls')) {
      iconClass = 'file-xls';
    } else if (itemFileExtension.match('ppt')) {
      iconClass = 'file-ppt';
    } else if (itemFileExtension.match('doc')) {
      iconClass = 'file-doc';
    }
    return iconClass;
  },
  iconClasses: function () {
    return 'media-image icon file ' + this.getIconClass();
  },
  renderTagsList: function () {
    return (<ul className="insight-item-tags-list">
      <li className="insight-tag-item">Tags:</li>
      {this.renderTags()}
    </ul>)
  },
  renderTags: function () {
    return _.map(this.props.item.tags, function (tag, i) {
      var boundClick = this.props.handleTagClick.bind(null, tag);

      return (<li className="insight-tag-item" key={i} onClick={boundClick}>{tag.name}</li>);
    }.bind(this));
  },
  render: function() {
    var tagsList, itemBody;

    if (this.props.item.tags.length) tagsList = this.renderTagsList();
    if (this.props.item.body.length) itemBody = (<div className="insight-item-body">{this.props.item.body}</div>);

    return (
      <li className="insight-item" key={this.props.id}>
        <a href={this.props.item.attachment} className={this.iconClasses()}></a>
        <div className="media-text">
          <div className="media-header"><a href={this.props.item.attachment} download={this.props.item.attachment_name}>{this.props.item.attachment_name}</a></div>
          <div className="media-subheader"><span>{this.props.item.user.name}</span> <span>|</span> <span>{moment(this.props.item.created_at).format('MMMM Do, YYYY')}</span></div>
          {itemBody}
          {tagsList}
        </div>
      </li>
    );
  }
});
