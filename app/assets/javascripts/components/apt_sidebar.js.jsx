var AptSidebar = React.createClass({
  renderTop: function() {
    return (
      <div className="top">
          <div className="top-title">{this.props.title}</div>
      </div>
    );
  },
  createComponent: function() {

  },
  renderContent: function() {
    var createLink = '/apt/dashboard_detail';
    return (
      <div style={{margin: "10px"}}className="sidebar-content">
        <Link to={createLink}>
          <button  style={{width: "100%"}} className="btn btn-primary">Create Component</button>
        </Link>
      </div>
    );
  },
  render: function() {
      return (
        <div className="sidebar">
          {this.renderTop()}
          {this.renderContent()}
        </div>
      );
  }

});
