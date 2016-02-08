var jScrollpaneMixin = {
  loadJScroll: function () {
    var scrollContainer = this.refs.jScrollContainer;

    if (scrollContainer) {
      // TODO -- use reinitialize
      $(scrollContainer).jScrollPane().data('jsp').addHoverFunc();
    } else {
      console.error('Please attach a "jScrollContainer" ref to an element');
    }
  }
};