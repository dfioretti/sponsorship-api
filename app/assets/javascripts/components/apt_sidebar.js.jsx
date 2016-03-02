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
    var scoresLink = '/apt/scores/score_index';
    var assetSetLink = "/apt/scores/asset_set_index";
    //<button  style={{width: "100%"}} className="btn btn-primary">Create Component</button>

    return (
      <div>
      <div style={{margin: "10px"}}>
        <button type="button" className="invisible-button" data-toggle="collapse" data-target="#collapse-menu" aria-expanded="false" aria-controls="collapse-menu" aria-label="Menu Hamburger">
          <span style={{color: "white", fontSize: "22px", textAlign: "center"}}className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
        </button>
        <span style={{color: "white", lineHeight: "14px", letterSpacing: "1.5px", verticalAlign: "text-top", paddingLeft: "10px", fontSize: "14px"}}>MENU</span>
      </div>

      <div style={{width: "100%", backgroundColor: "white"}}className="collapse" id="collapse-menu">
        <div style={{paddingTop: "0px"}}className="sidebar-content">
          <br />
          <Link to={createLink}>
            Create Component
          </Link><br /><br />
          <Link to={scoresLink}>
            View Scores
          </Link><br /><br />
          <Link to={assetSetLink}>
            Asset Sets
          </Link><br /><br />
        </div>
      </div>
      <div style={{margin: "10px"}}className="sidebar-content">
      </div>
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
