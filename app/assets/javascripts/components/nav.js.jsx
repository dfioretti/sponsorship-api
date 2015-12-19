var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var Nav = React.createClass({
  getInitialState: function() {
    return {loaded: false};
  },
  componentWillMount: function() {
    var st = PubSub.subscribe('auth.validation.success', function(ev, user) {
      this.setState({name: user.name, image: user.image});
    }.bind(this));
    var rt = PubSub.subscribe('auth.emailRegistration.success', function(ev, user) {
      var user = user.data;
      this.setState({name: user.name, image: user.image});
    }.bind(this));
    var ut = PubSub.subscribe('auth.signOut.success', function(ev, user) {
      this.setState({name: null, image: null});
    }.bind(this));
    this.setState({st: st, ut: ut, rt: rt});

    CompaniesStore.on("update", function() {
      this.setState({loaded: true});
    }.bind(this));

    if (CompaniesStore.getState().ready) {
      this.setState({loaded: true});
    }
  },
  componentWillUnmount: function() {
    PubSub.unsubscribe(this.state.st);
    PubSub.unsubscribe(this.state.ut);
    PubSub.unsubscribe(this.state.rt);
  },
  handleChange: function(e) {
    this.setState({query: e.target.value})
  },
  filterCompaniesOnQuery: function (companies) {
    var query = this.state.query;
    if (typeof(query) == "undefined" || query == "") {
      return companies;
    }
    matches = [];
    var substrRegex = new RegExp(query, 'i');
    $.each(companies, function(i, c) {
      if (substrRegex.test(c.name)) {
        matches.push(c)
      }
    });

    return matches
  },
  substringMatcher: function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      matches = [];

      substrRegex = new RegExp(q, 'i');

      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  },
  signOut: function() {
    $.auth.signOut();
  },
  renderMenu: function() {
    var menu;
    if (typeof(this.state.name) !== 'undefined') {
      menu = (
        <li>
          <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div className="nav-user-image">
              <span className="user-icon"></span>
            </div>
            <div className="nav-user-name">
              {this.state.name}
            </div>
          </a>
          <ul className="dropdown-menu" aria-labelledby="user-dropdown">
            <li><a onClick={this.signOut}>Sign out</a></li>
          </ul>
        </li>
      )
    } else {
      menu = (
        <li>
          <div className="nav-user-image">
            <span className="user-icon"></span>
          </div>
          <div className="nav-user-name">
            {this.state.name}
          </div>
        </li>
      )
    }
    return menu;
  },
  renderTitle: function() {
    if (this.props.title == 'dashboard') {
      var companyName, companies;
      if (this.state.loaded) {
        var queried = this.filterCompaniesOnQuery(CompaniesStore.getState().companies);
        companyName = CompaniesStore.getState().current.name,
        companies = $.map(queried, function(company) {
          var link = '/dashboard/' + company.id;
          return (
          <li key={company.id}><Link to={link}>{company.name}</Link></li>
          );
        });
      }

      return (
        <div>
          <a href="#" className="company-select" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            {companyName} <span className="caret"></span>
          </a>

          <div className="dropdown-menu">
            <div className="dropdown-searchbar">
              <input type="text" placeholder="Search by Company Name" value={this.state.query} onChange={this.handleChange}/>
            </div>
            <div className="company-list">
              <ul>
                {companies}
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <p>{this.props.title}</p>
      );
    }
  },
  render: function() {
    return (
      <nav id="navbar" className="nav navbar-default navbar-fixed-top">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="nav-center">{this.renderTitle()}</div>
        <div className="navbar-collapse collapse">
          <div className="nav navbar-nav navbar-left nav-brand"><Link to="choose_company">Teneo</Link></div>
          <ul className="nav navbar-nav navbar-right nav-user">
            {this.renderMenu()}
          </ul>
        </div>
      </nav>
    );
  }
});
