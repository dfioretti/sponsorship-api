var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var NavHack = React.createClass({
  getInitialState: function() {
    return {loaded: false};
  },
  setupTable: function() {

    var options = {
      valueNames: [ 'name' ]
    };

    var userList = new List('companies', options);

    $("input[type='search']").attr("placeholder", "Asset Search");
    //$("input[type='search']").hide();
    $(document).on('click', function(evt) {

      if(!$(evt.target).is("input[type='search']")) {
        console.log(evt.target);
        if(!$(evt.target).is('td')) {
        $('.dataTables_scrollHead').hide();
        $("input[type='search']").hide();
        $('#searchTable').hide();
      } else {
        if ($(evt.target).is('td')) {
          var td = $(evt.target);
          window.location = '/apt/asset/dashboard/' + $(td).data('id');
        }
      }
    }
      /*
      console.log("got click");
      if ($( "#toggleCheck" ).hasClass( "open" )) {
        console.log("has open");
        $('#searchTable').show();
        $('.dataTables_scrollHead').show();
        $("input[type='search']").show();
      } else {
        console.log("no open");
        $('#searchTable').hide();
        $('.dataTables_scrollHead').hide();
        $("input[type='search']").hide();
      }*/
    });
    console.log("setup table");
    var table = $('#searchTable');
    if ($(table).length) {
      $(table).DataTable(
        {
          "bPaginate": false,
          //"bFilter": false,
          "order": false,
          "oLanguage": {
            "sSearch": "",
            "sZeroRecords" : "",
          },
          "sScrollY": "400px",
          "scrollCollapse": true,
          "paging": false,
          "bScrollAutoCss": false,
          "bInfo" : false,
          "aoColumns" : [
            { "bSortable" : false, "sWidth" : "110px"},
            { "bSortable" : false, "sWidth" : "190px"}
          ]
        }
      );

      $("input[type='search']").width(238);
      $("input[type='search']").css({
        "position" : "absolute",
        "left" : "-156px",
        "top" : "-60px",
        "z-index" : 1000000,

      });
      $("input[type='search']").attr("placeholder", "Asset Search");
      $("input[type='search']").hide();


      /*$(document).on('keyup', "input[type='text']", function(){
        alert("yo");
        var oTable = $('.dataTable').dataTable();
        oTable.fnFilter($(this).val());
      });
      //$('label', '#searchTable_filter').text('');
      */
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
  handleSearch: function() {
    $('#searchTable').toggle();
    $('.dataTables_scrollHead').toggle();
    $("input[type='search']").toggle();

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
        matches.push(a)
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
  doFilter: function() {


  },
  renderTitle: function() {
    var thumbImage = {
      height: "50px",
      width: "50px",
      borderRadius: "50%",
    };

    if (this.props.title == 'apt') {
        var assetName, assets;
        if (this.state.loaded) {
          var queried = this.filterAssetsOnQuery(AssetsStore.getState().assets);
          assetName =  "Select Asset";
          assets = $.map(queried, function(asset) {
            var link = '/apt/asset/dashboard/' + asset.id;
            // lets get fancy
            var image = "/images/" + asset.id + ".jpg";
            var imgStyle = {
              height: "50px",
              width: "50px",
              borderRadius: "50%"
            };
            return (
                <tr>
                  <td data-id={asset.id}>
                    <img style={imgStyle}src={image} />
                    </td>
                  <td data-id={asset.id}>
                    {asset.name}
                  </td>
                </tr>
              );
            });
        }

      var tableStyle = {
        //background: "white",
        //marginLeft: "275px",
        padding: "4px",
        width: "300px",
        background: "white",
        display: "none",
        //height: "400px"
      };
      var searchStyle = {
        zIndex: "-99999999",
        position: "absolute",
        //display: "none",
        //top: "40px",
      };
      var none = {
        display: "none"
      };
      return (
        <div>
          <div id="toggleCheck">

          <a href="#" onClick={this.handleSearch} className="company-select" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Select Asset <span className="caret"></span>
          </a>

          <div style={searchStyle} className="dropdown-menu">
            <div className="dropdown-searchbar">
              <input type="text" placeholder="Search by Asset Name" />
            </div>
            <div style={none} className="company-list">
              <ul>
                <li>
                </li>
              </ul>
            </div>
          </div>
        </div>

          <div id="tableWrapper">

        <table style={tableStyle} id="searchTable" cellPadding="10" className="company-list" ref="assetTable">
          <thead>
            <tr>
              <th>
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            {assets}
          </tbody>
        </table>
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
          <li key={company.id} className="name"><Link to={link}>{company.name}</Link></li>
          );
        });
      }
      /*
      value={this.state.query} onChange={this.handleChange}/>
      */

      return (
        <div>
          <a href="#" className="company-select" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            {companyName} <span className="caret"></span>
          </a>

          <div className="dropdown-menu">
            <div className="dropdown-searchbar">
              <input onKeyUp={this.doFilter} type="text" placeholder="Search by Company Name" />
            </div>
            <div className="company-list">
              <ul id="companies" className="list">
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
    this.setupTable();
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
