var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;


var AddedData = React.createClass({
  mixins: [FluxMixin],
  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },
  handleRemoveData: function(e) {
    this.getFlux().actions.removeData(e.target.id);
  },
  render: function() {
    return (
      <div className="added-data">
        <label>Chart Data</label>
        <table>
          {this.getStateFromFlux().data.map(function(item) {
            return (<tr><td>{item.entity.name}</td><td>{item.metric.point}</td>
                    <td onClick={this.handleRemoveData}>X</td> </tr>);
          }.bind(this))}
        </table>
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
          Component Settings
        </div>
          <div className="row">
            <div className="col-md-6">
              <ul>
                <li>{this.getStateFromFlux().title }</li>
                <li>{this.getStateFromFlux().view }</li>
              </ul>
            </div>
            <div className="col-md-6">
              <AddedData />
            </div>
        </div>
      </div>
    );
  }

});
