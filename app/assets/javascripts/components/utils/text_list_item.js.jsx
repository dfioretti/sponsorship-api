var TextListItem = React.createClass({
  renderDate: function() {
    var dateEl;
    if (this.props.date) {
      var date = new Date(this.props.date);
      var y = date.getFullYear().toString();
      var m = (date.getMonth()+1).toString();
      var d  = date.getDate().toString();

      var dateStr = (m[1]?m:"0"+m[0]) + '/' + (d[1]?d:"0"+d[0]) + '/' + y;
      dateEl = (
        <div className="li-date">{dateStr}</div>
      );
    }
    return dateEl;
  },
  renderAttachment: function() {
    var attachment;
    if (this.props.attachment) {
      var n = this.props.attachment.lastIndexOf('/');
      var name = this.props.attachment.substring(n + 1);
      attachment = (
        <div className="li-attachment">
          <a className="li-attachment-download" href={this.props.attachment} target="_blank"></a>
          <div className="li-attachment-name">{name}</div>
        </div>
      );
    }
    return attachment;
  },
  render: function() {
    return (
      <li className="probability-list-item">
        <div className="li-info">
          <div className="li-image"></div>
          <div className="li-name">{this.props.user.name}</div>
          {this.renderDate()}
        </div>
        <div className="li-text">{this.props.body}</div>
        {this.renderAttachment()}
      </li>
    );
  }
});
