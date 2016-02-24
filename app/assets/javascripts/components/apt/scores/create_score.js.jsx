var CreateScore = React.createClass({
  handleClick: function() {
      $.ajax({
        type: "GET",
        contentType: "application/json",
        "url": "/api/v1/apt/scores/new",
        success: function(data, status, xhr) {
          console.log(data);
          window.location.href = "score_editor/" + data.id;
        },
        error: function(data, status, xhr) {
          console.log(data);
        }
      });
  },
  render: function() {
    var imageSize = {
      position: "absolute",
      height: "128px",
      width: "128px",
      top: "100px",
      left: "130px",
      cursor: "pointer",
    };

    //var link = "/apt/scores/score_editor/" + this.props.score.id;
    return (
      <div className="dashboard-module">
        <div className="top">
          <div className="drag-handle">
          </div>
          <div className="top-title">
            Create New Score
          </div>
        </div>
        <div onClick={this.handleClick} className="main">
          <div className="icon-wrapper" style={imageSize}>
              <div className="module-new-icon">
              </div>
          </div>
        </div>
      </div>
    );
  }
});
