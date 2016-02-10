var jScrollpaneMixin = {
  toggleScrollActive: function (e) {
    $(e.target).addClass('scroll-active');
    clearTimeout(this.scrollToggleTimeout);

    var removeActive = function () {
      $(e.target).removeClass('scroll-active');
    };

    this.scrollToggleTimeout = setTimeout(removeActive.bind(this), 200);
  }
};