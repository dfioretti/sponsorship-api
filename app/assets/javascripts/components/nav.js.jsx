var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var Nav = React.createClass({
  getInitialState: function() {
    return {loaded: false};
  },
  enableSearch: function() {
    if($('#search_input').length) {
      $('#search_input').fastLiveFilter('#search_list');
    }
  },
  componentWillMount: function() {
    var st = PubSub.subscribe('auth.validation.success', function(ev, user) {
      this.setState({name: user.name, image: user.image, permissions: user.permissions});
    }.bind(this));
    var rt = PubSub.subscribe('auth.emailRegistration.success', function(ev, user) {
      var user = user.data;
      this.setState({name: user.name, image: user.image, permissions: user.permissions});
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

    //AssetsStore.setCurrent();

    AssetsStore.on("update", function() {
      this.setState({loaded: true});
    }.bind(this));

    if (AssetsStore.getState().ready) {
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

  filterAssetsOnQuery: function (assets) {
    var query = this.state.query;
    if (typeof(query) == "undefined" || query == "") {
      return assets;
    }
    matches = []
    var substrRegex = new RegExp(query, 'i');
    $.each(assets, function(i, a) {
      if (substrRegex.test(a.name)) {
        console.log(a);
        console.log(a.id);
        matches.push(a);
      }
    });

    return matches;
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
  renderLogo: function() {
    var logo;
    if (typeof(this.state.name) !== 'undefined' && this.state.name !== null) {
      logo = <div className="nav navbar-nav navbar-left nav-brand"><Link to="choose_company">Teneo</Link></div>
    } else {
      logo = <div className="nav navbar-nav navbar-left nav-brand"><Link to="account_login">Teneo</Link></div>
    }
    return logo;
  },
  renderMenu: function() {
    var menu;

    if (typeof(this.state.name) !== 'undefined' && this.state.name !== null) {
      if (this.state.permissions) {
        var access = $.map(this.state.permissions, function(p, i) {
          var link = PermissionLinkMap[p]
          return (
            <li key={i}><Link to={link}>{p.slice(0,1).toUpperCase() + p.substring(1)}</Link></li>
          );
        });
      }

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
            {access}
            <li role="separator" className="divider"></li>
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
    //if (typeof(this.state.name) !== 'undefined' && this.state.name !== null) {
    if (true) {
        var assetName, assets;
        if (this.state.loaded) {
          // need faster search to render images
          //var queried = this.filterAssetsOnQuery(AssetsStore.getState().assets);
          var queried = AssetsStore.getState().assets;
          assetName =  "Go To Asset";
          assets = $.map(queried, function(asset) {
            var image = "/images/" + asset.id + ".jpg";
            var imgStyle = {
              height: "50px",
              width: "50px",
              borderRadius: "50%"
            };
            var link = '/apt/asset/dashboard/' + asset.id;
            return (
              <div key={asset.id} className="asset-nav-list">
                <Link className="asset-link" to={link}>
                <ul>
                  <li className="thumb">
                    <img style={imgStyle} src={image} />
                  </li>
                  <li className="asset-name">
                    {asset.name}
                  </li>
                </ul>
              </Link>
              </div>
            );
          });
        }
        //value={this.state.query} onChange={this.handleChange}/>
      return (
        <div>
          <a href="#" className="company-select" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            {assetName}<span className="caret"></span>
          </a>

          <div className="dropdown-menu">
            <div className="dropdown-searchbar">
              <input id="search_input" type="text" placeholder="Search by Asset Name" />
            </div>
            <div className="company-list">
              <ul id="search_list">
                {assets}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    else if (this.props.title == 'dashboard') {
      var companyName, companies;
      if (this.state.loaded) {
        var queried = this.filterCompaniesOnQuery(CompaniesStore.getState().companies);
        companyName = CompaniesStore.getState().current.name,
        companies = $.map(queried, function(company) {
          var link = '/ews/dashboard/' + company.id;
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
    } else if (this.props.title == 'fifa') {
      return (
        <div>
          <h3>FIFA</h3>
          <p>Company Scorecard</p>
        </div>
      );
    } else {
      return (
        <p>{this.props.title}</p>
      );
    }
  },
  render: function() {
    this.enableSearch();
    return (
      <nav id="navbar" className="nav navbar-default navbar-fixed-top">
        <div className="nav-center">{this.renderTitle()}</div>
        <div className="navbar-collapse collapse">
          {this.renderLogo()}
          <ul className="nav navbar-nav navbar-right nav-user">
            {this.renderMenu()}
          </ul>
        </div>
      </nav>
    );
  }
});
