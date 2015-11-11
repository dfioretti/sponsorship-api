var Route = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute;

this.AppRoutes = (
  <Route handler={App}>
    <Route name='sign_in' handler={SignIn} path='/sign_in' />
    <Route name='sign_up' handler={SignUp} path='/sign_up' />
    <Route name='password_recovery' handler={PasswordRecovery} path='/password_recovery' />
    <DefaultRoute handler={SignIn} />
  </Route>
);
