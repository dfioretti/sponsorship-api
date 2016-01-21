var InsightListItem = React.createClass({

  getIconClass: function () {
    var itemFileExtension = _.last(this.props.item.attachment.split('.')).toLowerCase();
    var iconClass = 'file-default';

    if (itemFileExtension.match('pdf')) {
      // iconUrl =
    } else if (itemFileExtension.match('xls')) {

    } else if (itemFileExtension.match('ppt')) {

    }
    return iconClass;
  },
  iconClasses: function () {
    return 'media-image icon file ' + this.getIconClass();
  },
  render: function() {
    return (
      <li className="insight-item" key={this.props.id}>
        <div className={this.iconClasses()}></div>
        <div className="media-text">
          <div className="media-header"><a href={this.props.item.attachment}>{this.props.item.attachment_name}</a></div>
          <div className="media-subheader"><span>{this.props.item.user.name}</span> <span>|</span> <span>December 20, 2015</span></div>
          <div className="insight-item-body">{this.props.item.bio}</div>
        </div>
      </li>
    );
  }
});
