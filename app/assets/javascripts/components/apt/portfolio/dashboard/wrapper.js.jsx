var Wrapper = React.createClass({

  /**
   * Wrapper for dashboard view to
   * pass through Flux
   */
  render: function() {
    var flux = new Fluxxor.Flux(stores, actions);
    window.flux = flux;

    flux.on("dispatch", function(type, payload) {
      if (console && console.log) {
        console.log("[Dispatch]", type, payload);
      }
    });
    return (
      <PortfolioDashboard flux={flux} />
    );
  }
});
