var Route = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute;

this.AppRoutes = (
  <Route handler={App}>
    <Route name='account_login' handler={AccountLogin} path='/account_login' />
    <Route name='create_account' handler={CreateAccount} path='/create_account' />
    <Route name='password_recovery' handler={PasswordRecovery} path='/password_recovery' />
    <DefaultRoute handler={AccountLogin} />
  </Route>
);
