
var AddedDataRow = React.createClass({
  mixins: [FluxMixin],

  handleRemoveData: function(e) {
    this.getFlux().actions.removeData(e.target.id);
    this.getFlux().actions.generatePreviewData();
  },
  render: function() {
    return (
      <div className="added-data-row">
        <div className="col-md-2 medium-round-images bs-col">
          <img src={this.props.imageOne} />
        </div>
        <div className="col-md-4 bs-col">
          {this.props.labelOne}
        </div>
        <div className="col-md-2 medium-round-images bs-col">
          <img src={this.props.imageTwo} />
        </div>
        <div className="col-md-3 bs-col">
          {this.props.labelTwo}
        </div>
        <div className="col-md-1 bs-col">
          <span
            style={{
              color: "#e76959",
              padding: "5px",
              fontSize: "20px"
            }}
            onClick={this.handleRemoveData}
            id={this.props.id}
            className="glyphicon glyphicon-remove actionable"
            aria-hidden="true" />
        </div>
      </div>
    );
  }
});

var AddedData = React.createClass({
  mixins: [FluxMixin],

  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },
  render: function() {
    var i = 0;
    return (
      <div className="row filter-row editor-data-table">
        {this.getStateFromFlux().data.map(function(item) {
          var entityImage = '/images/' + item.entity.entity_id + '.jpg';
          return (
            <AddedDataRow key={i} id={i++} imageOne={entityImage}
              imageTwo={item.metric.point_image}
              labelOne={item.entity.name}
              labelTwo={item.metric.point.split("_").pop()}
            />
          );
        }.bind(this))}
      </div>
    );
  }
});


var EditorData = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ComponentEditorStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("ComponentEditorStore").getState();
  },
  render: function() {
    return (
      <div className="editor-data">
        <div className="input-heading">
          Selected Data
        </div>
        <AddedData />
      </div>
    );
  }
});
