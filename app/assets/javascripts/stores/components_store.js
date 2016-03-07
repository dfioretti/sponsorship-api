/**
 * ComponentsStore holds all of the component definitions
 * with their cached data state.
 */

var ComponentsStore = Fluxxor.createStore({
  /**
   * Will initialie and load the components from
   * the database.
   * @constructor
   */
  initialize: function() {
    this.components = {};
    this.loaded = false;
    ComponentClient.getComponents(function(data) {
      data.forEach(function(d) {
        this.components[d.id] = d;
      }.bind(this));
      this.loaded = true;
    }.bind(this));
  },

  /**
   * Get a specific component.
   * @params {integer} cid - the component id
   * @return {Object} - the component
   */
  getState: function(cid) {
    return this.components[cid];
  }

  /*
   * TODO: Need to register for the save on editor
   * to force update.
   */
});
window.ComponentsStore = new ComponentsStore();
