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
    return 'media-image file ' + this.getIconClass();
  },
  render: function() {
    return (
      <li key={this.props.id}>
        <div className={this.iconClasses()}></div>
        <div className="media-text">
          <div className="media-header">{this.props.item.name} <a href={this.props.item.profile} target="_blank">({this.props.item.handle})</a></div>
          <div>{this.props.item.bio}</div>
          <div>Following: {this.props.item.following}</div>
          <div>Followers: {this.props.item.followers}</div>
        </div>
      </li>
    );
  }
});
