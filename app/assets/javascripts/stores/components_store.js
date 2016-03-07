
var ComponentsStore = Fluxxor.createStore({

    initialize: function() {
      this.components = {};
      this.loaded = false;
      ComponentClient.getComponents(function(data) {
        this.components = data;
        this.loaded = true;
      }.bind(this));
    }
});

window.ComponentsStore = new ComponentsStore();
