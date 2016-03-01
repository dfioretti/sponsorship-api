var AssetSetCard = React.createClass({
  render: function() {
    var id = "asset_set_card_" + this.props.asset_set.id;
    var setStyle = {
      zIndex: "1000",
      width: "100%",
      textAlign: "center",
      color: "white",
      marginTop: "0px"
    };
    var link = "/apt/scores/asset_set_editor/" + this.props.asset_set.id;
    return (
      <div id={id} className="dashboard-module">
        <div className="top">
          <div className="drag-handle">
          </div>
          <div className="top-title">
            {this.props.asset_set.name}
          </div>
        </div>
        <div className="main">
          <a href={link}>
            <h4 style={setStyle}>{this.props.asset_set.name}</h4>
          </a>
        </div>
      </div>
    );
  }
});
