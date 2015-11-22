var TextListItem = React.createClass({

  render: function() {
    return (
      <li className="probability-list-item">
        <div className="li-image"></div>
        <div className="li-name"></div>
        <div className="li-date"></div>
        <div className="li-text"></div>
        <div className="li-attachment">
          <div className="li-attachment-download"></div>
          <div className="li-attachment-name"></div>
        </div>
      </li>
    );
  }
});
