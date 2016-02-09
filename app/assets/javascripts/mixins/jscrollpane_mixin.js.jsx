var jScrollpaneMixin = {
  loadJScroll: function () {
    var scrollContainer = this.refs.jScrollContainer;

    if (scrollContainer) {
      // TODO -- use reinitialize
      if ($(scrollContainer).data('jsp')) {
        $(scrollContainer).data('jsp').destroy();
      }

      var scroller = $(scrollContainer).jScrollPane()
      scroller.data('jsp').addHoverFunc();
      // scroller.reinitialise();
      // scroller;
      // $(scrollContainer).addHoverFunc()
    } else {
      console.error('Please attach a "jScrollContainer" ref to an element');
    }
  }
};