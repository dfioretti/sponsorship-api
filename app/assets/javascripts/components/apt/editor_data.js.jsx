var AddedData = React.createClass({
  mixins: [FluxMixin],
  getStateFromFlux: function() {
    return flux.store("ComponentStore").getState();
  },
  handleRemoveData: function(e) {
    this.getFlux().actions.removeData(e.target.id);
  },
  render: function() {
    console.log(this.getStateFromFlux().data);
    var i = 0;
    return (
      <div className="added-data">
        <label>Chart Data</label>
        <table>
          {this.getStateFromFlux().data.map(function(item) {
            return (<tr id={item.index}><td>{item.source.name}</td><td>{item.point.name}</td><td>{item.data_id}</td>
            <td id={item.index} onClick={this.handleRemoveData}>
              X
            </td> </tr>);
          }.bind(this))}
        </table>
      </div>
    );
  }

});


var EditorData = React.createClass({
  mixins: [FluxMixin],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("ComponentStore").getState();
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
                <li>{this.getStateFromFlux().title}</li>
                <li>{this.getStateFromFlux().chartType}</li>
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
