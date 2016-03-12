var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

var AppSidebar = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ComponentEditorStore")],

  getInitialState: function() {
    return {};
  },
  getStateFromFlux: function() {
    return flux.store("ComponentEditorStore").getState();
  },

  toggleMenu: function() {
    $("#app-menu").slideToggle(250);
  },

  renderTopMenu: function() {
    return (
      <div className="sidebar-top-menu">
        <div className="top-menu">
          <div onClick={this.toggleMenu} className="menu-container">
            <div id="menu-button" className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></div>
            <div className="menu-text">Menu</div>
          </div>
          <div id="app-menu">
            <ul>
              <li>
                Dashboards
                <ul>
                  <CreateDashboardModal id="required" mode="create"/>
                  <CreateDashboardModal id="other" mode="edit" />
                  <Link to="/">
                    <li>
                      &nbsp;&nbsp;- View
                    </li>
                  </Link>
                </ul>
              </li>
              <li>
                Components
                <ul>
                  <Link to="/apt/editor">
                    <li>
                      &nbsp;&nbsp;- Create
                    </li>
                  </Link>
                </ul>
              </li>
              <li>
                <Link to="/">
                  Scores
                </Link>
              </li>
              <li>
                <Link to="/">
                  Data
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
  handleContextChange: function(e) {
    this.getFlux().actions.changePane(e.target.id);
  },
  renderContextListItem: function(item) {
    if (item == this.getStateFromFlux().editorPane) {
      return (
        <li id={item} className="active-item">
          {item}
        </li>
      );
    } else {
      return (
        <li id={item} >
          {item}
        </li>
      );
    }
  },
  renderContent: function() {
    if (this.props.view === "dashboard") {
      return (
        <div className="context-menu">
          <DashboardContextMenu />
        </div>
      );
    }
    else {
      return (
        <div className="context-menu">
          <div className="editor-menu">
            <ul onClick={this.handleContextChange}>
              {this.renderContextListItem('general')}
              {this.renderContextListItem('chartType')}
              {this.renderContextListItem('data')}
              {this.renderContextListItem('appearance')}
              {this.renderContextListItem('configuration')}
            </ul>
          </div>
        </div>
      );
    }
  },
  render: function() {
    return (
      <div className="apt-sidebar">
        {this.renderTopMenu()}
        {this.renderContent()}
      </div>
    );
  }
});
