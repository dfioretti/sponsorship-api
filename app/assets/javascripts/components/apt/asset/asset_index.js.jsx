var RouteHandler = ReactRouter.RouteHandler,
    Link = ReactRouter.Link;

var AssetIndex = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    return {orderBy: {field: "score", order: 1}, assets: [], showSearch: false};
  },
  componentWillMount: function() {
    this.props.setTitle('');

    if (AssetsStore.getState().ready) {
      this.setState({assetsLoaded: true, assets: AssetsStore.getState().assets});
    }

    AssetsStore.on("update", function() {
      this.setState({assetsLoaded: true, assets: AssetsStore.getState().assets});
    }.bind(this));
  },
  setAsset: function(e) {
    AssetsStore.setCurrent(e.id);
    this.transitionTo('/apt/asset/dashboard/' + e.id);
  },
  toggleSearch: function(e) {
    if (!this.state.showSearch) {
      $(e.target).addClass('on');
      $('.search-box').animate({height: 70, paddingTop: 14, paddingBottom: 14}, 300);
    } else {
      $(e.target).removeClass('on');
      $('.search-box').animate({height: 0, paddingTop: 0, paddingBottom: 0}, 300);
    }

    this.setState({showSearch: !this.state.showSearch})
  },
  handleChange: function(e) {
    this.setState({query: e.target.value})
  },
  showTooltip: function(e) {
    var $el = $(e.target), ratio;
    if ($el.hasClass('fill-bar')) {
      ratio = $el.width()
    } else {
      ratio = $el.children('.fill-bar').width()
    }

    var color = riskColor(ratio / 100);
    var left = ratio - 32;
    var tooltipStyle = {left: left, backgroundColor: color}
    var arrowStyle = {borderTop: "20px solid " + color}

    $('.custom-tooltip').css({left: $el.offset().left + left, top: $el.offset().top - 60, backgroundColor: color});
    $('.custom-tooltip-arrow').css({borderTop: "20px solid " + color});
    $('.custom-tooltip .risk-label').html(riskLabel(ratio / 100))
    $('.custom-tooltip').show();
  },
  hideTooltip: function(e) {
    $('.custom-tooltip').hide();
  },
  filterAssetsOnQuery: function (assets) {
    var query = this.state.query;
    if (typeof(query) == "undefined" || query == "") {
      return assets;
    }
    matches = [];
    var substrRegex = new RegExp(query, 'i');
    $.each(assets, function(i, a) {
      if (substrRegex.test(a.name)) {
        matches.push(a)
      }
    });

    return matches
  },
  order: function(value) {
    switch (value) {
      case 0:
        var order = 0;
        if (this.state.orderBy.field == "name" && this.state.orderBy.order == 0) {
          order = 1;
        }
        this.setState({orderBy: {field: "name", order: order}});
        break;
      case 1:
        var order = 0;
        if (this.state.orderBy.field == "score" && this.state.orderBy.order == 0) {
          order = 1;
        }
        this.setState({orderBy: {field: "score", order: order}});
        break;
      case 2:
        var order = 0;
        if (this.state.orderBy.field == "scope" && this.state.orderBy.order == 0) {
          order = 1;
        }
        this.setState({orderBy: {field: "scope", order: order}});
        break;
    }
  },
  renderList: function() {
    var assets = this.filterAssetsOnQuery(this.state.assets);
    console.log("assets in render");
    console.log(assets);
    if (this.state.orderBy) {
      assets.sort(function(c1, c2){
        var order;
        var field1 = c1[this.state.orderBy.field];
        var field2 = c2[this.state.orderBy.field];

        if (typeof(field1) === 'string') {
          field1 = field1.toUpperCase();
        }
        if (typeof(field2) === 'string') {
          field2 = field2.toUpperCase();
        }

        if (this.state.orderBy.order == 0) {
          order = field1 > field2 ? 1 : -1
        } else {
          order = field1 < field2 ? 1 : -1
        }

        return order;
      }.bind(this));
    }

    var list = $.map(assets, function(asset){
      var ratio = asset.score/1;
      var color = riskColor(ratio);
      var barStyle = {backgroundColor: color, width: 100 * ratio}
      var colorStyle = {color: color}

      return (
        <tr className="company-cell" key={asset.id} onClick={this.setAsset.bind(this, asset)}>
          <td><div>{asset.name} ({asset.scope})</div></td>
          <td onMouseLeave={this.hideTooltip}>
            <div className="bkg-bar" onMouseOver={this.showTooltip}>
              <div className="fill-bar" style={barStyle}></div>
            </div>
            <span style={colorStyle}>{(parseFloat(asset.score) * 100).toFixed(2)}%</span>
          </td>
          <td>{asset.subcategory}</td>
        </tr>
      );
    }.bind(this));
    return (
      <tbody onScroll={this.hideTooltip}>
        {list}
      </tbody>
    );
  },
  render: function() {
    return (
      <div className="centered company-index">
        <div className="custom-tooltip">
          <span className="risk-label"></span>
          <div className="custom-tooltip-arrow"></div>
        </div>
        <div className="top">
          <p className="top-title">Choose Asset</p>
          <div className="search-toggle" onClick={this.toggleSearch}></div>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search by Asset Name" value={this.state.query} onChange={this.handleChange}/>
        </div>
        <div className="company-index-table">
          <table>
            <thead>
              <tr>
                <th><a href="#" onClick={this.order.bind(this, 0)}>Asset<span className="caret"></span></a></th>
                <th><a href="#" onClick={this.order.bind(this, 1)}>Score<span className="caret"></span></a></th>
                <th><a href="#" onClick={this.order.bind(this, 2)}>Subcategory<span className="caret"></span></a></th>
              </tr>
            </thead>
            {this.renderList()}
          </table>
        </div>
      </div>
    );
  }
});

