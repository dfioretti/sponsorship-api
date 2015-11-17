var Route = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute;

this.AppRoutes = (
  <Route handler={App}>
    <Route name='account_login' handler={AccountLogin} path='/account_login' />
    <Route name='create_account' handler={CreateAccount} path='/create_account' />
    <Route name='password_recovery' handler={PasswordRecovery} path='/password_recovery' />
    <Route name='reset_password' handler={ResetPassword} path='/reset_password' />
    <Route name='choose_company' handler={CompanyIndex} path='/choose_company'/>
    <DefaultRoute handler={CompanyIndex}/>
  </Route>
);
