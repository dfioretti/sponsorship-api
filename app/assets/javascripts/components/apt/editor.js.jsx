var RouteHandler = ReactRouter.RouteHandler,
  Link = ReactRouter.Link;

var Editor = React.createClass({
  getInitialState: function() {
    return {};
  },
  toggleMenu: function() {
    $("#app-menu").slideToggle(250);
  },
  toggleActive: function(e) {
    console.log(e);
    $('li').removeClass('active-item');
    $(e.target).addClass('active-item');

  },
  renderSidebar: function() {
    return (
      <div className="editor-side">
        <div className="top-menu">
          <div onClick={this.toggleMenu} className="menu-container">
            <div id="menu-button" className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></div>
            <div className="menu-text">Menu</div>
          </div>
          <div id="app-menu">
            <ul>
              <li>
                <Link to="/">
                  Dashboards
                </Link>
              </li>
              <li>
                <Link to="/">
                  Components
                </Link>
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
        <div className="context-menu">
          <div className="editor-menu">
            <ul onClick={this.toggleActive}>
                <li className="active-item">
                  General
                </li>
                <li>
                  Chart Type
                </li>
                <li>
                  Appearance
                </li>
                <li>
                  Data
                </li>
                <li>
                  Configuration
                </li>
              </ul>
          </div>
        </div>
      </div>
    );
  },
  renderSubNav: function() {
    return (
      <div className="subnav">
        Hey
      </div>
    );
  },
  renderPane: function() {
    return (
      <div className='editor-box'>
        <div className="editor-container">
          <div className="edit-pane">
          </div>
          <div className="preview-container">

            <div className="preview-view">
              <div className="preview-chart">

              </div>
            </div>
            <div className="preview-data">

            </div>
          </div>
        </div>

      </div>
    );
  },
  renderSide: function() {
    return (
      <div>

      </div>
    );
  },
  render: function() {
    var flux = new Fluxxor.Flux(stores, actions);
    window.flux = flux;

    flux.on("dispatch", function(type, payload) {
      if (console && console.log) {
        console.log("[Dispatch]", type, payload);
      }
    });

    // #FAFBFD - color of dashboard in detail-module
    // $dark-blue - color of regualr dash
    //{this.renderSidebar()}
    //{this.renderSubNav()}
    //<ComponentEditor />
    return (
      <div className="editor">
        <AppSidebar flux={flux}/>
        <ComponentEditor flux={flux} />
      </div>
    );
  }
});
