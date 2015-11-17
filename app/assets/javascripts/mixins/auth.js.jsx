var Auth = {
  statics: {
    willTransitionTo: function (transition, component) {
      if ($.isEmptyObject($.auth.user)) {
        transition.redirect('/account_login');
      }
    }
  },
}
