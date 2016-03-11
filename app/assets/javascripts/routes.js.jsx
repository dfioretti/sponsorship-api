var Route = ReactRouter.Route,
    DefaultRoute = ReactRouter.DefaultRoute;

this.AppRoutes = (
  <Route handler={App}>
    <Route name='account_login' handler={AccountLogin} path='/account_login' />
    <Route name='create_account' handler={CreateAccount} path='/create_account' />
    <Route name='password_recovery' handler={PasswordRecovery} path='/password_recovery' />
    <Route name='reset_password' handler={ResetPassword} path='/reset_password' />
    <Route name='choose_company' handler={CompanyIndex} path='ews/choose_company'/>
    <Route name='dashboard' handler={Dashboard} path='ews/dashboard/:id'/>
    <Route name='company_detail' handler={CompanyDetail} path='ews/dashboard/:id/detail'/>
    <Route name='fifa_dashboard' handler={FifaDashboard} path='fifa/dashboard'/>
    <Route name='fifa_detail' handler={FifaDetail} path='fifa/dashboard/:detail_type'/>
    <Route name='users' handler={UsersIndex} path='admin/users'/>
    <Route name='portfolio_dashboard' handler={PortfolioDashboard} path='apt/portfolio/dashboard' />
    <Route name='asset_dashboard' handler={AssetDashboard} path='apt/asset/dashboard/:id' />
    <Route name='choose_asset' handler={AssetIndex} path='apt/asset/choose_asset' />
    <Route name='score_editor' handler={ScoreEditor} path='apt/scores/score_editor/:id' />
    <Route name='score_index' handler={ScoreIndex} path='apt/scores/score_index' />
    <Route name='asset_set_editor' handler={AssetSetEditor} path='apt/scores/asset_set_editor/:id' />
    <Route name='asset_set_index' handler={AssetSetIndex} path='apt/scores/asset_set_index' />
    <Route name='dashboard_detail' handler={DashboardDetail} path='apt/dashboard_detail' />
    <Route name='editor' handler={Editor} path='/apt/editor' />
    <Route name='editor_update' handler={Editor} path='/apt/editor/:id' />
    <Route name='component_editor' handler={ComponentEditor} path='/apt/component_editor' />
    <Route name='dashboard_home' handler={DashboardHome} path='/apt/dashboard/:id' />
    <Route name='fiddle' handler={Fiddle} path='/apt/fiddle' />
    <DefaultRoute handler={PortfolioDashboard} />
  </Route>
);
