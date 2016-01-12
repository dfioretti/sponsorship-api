var KeySocialPosts = React.createClass({
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="key_social_posts" className="dashboard-module tall" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Key Social Posts</div>
        </div>
      </div>
    );
  }
});
