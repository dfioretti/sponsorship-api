var GlobalHotspots = React.createClass({
  getInitialState: function () {
    return {};
  },
  // componentDidMount: function() {
  //   this.createMap();
  // },
  componentWillReceiveProps: function (newProps) {
    // .format("YYYY-MM-DD HH:mm:ss")
    // this.createMap();
    if (!this.state.map) {
      this.createMap(newProps);
    } else if(this.state.clusterLayer) {
      this.reloadMap(newProps);
    }
  },
  loadClusters: function (newProps) {
    var component = this;
    var map = this.state.map;
    var clusterSQL = he.decode(this.getSQL(newProps), {
      'strict': true
    });

    cartodb.createLayer(map, {
      user_name:'amandacoston',
      type:'cartodb',
      sublayers:[{
        sql: clusterSQL,
        cartocss:"#layer{  "+
                    "marker-width: 12;" +
                    "marker-fill: #5CA2D1;" +
                    "marker-line-width: 1.5;" +
                    "marker-fill-opacity: 0.8;" +
                    "marker-line-opacity: 0;" +
                    "marker-line-color: #fff;" +
                    "marker-allow-overlap: true;" +
                    "[src = 'level2'] {" +
                      "marker-line-width: 0;" +
                      "marker-width: 8;" +
                    "}" +
                    "[src = 'level3'] {" +
                      "marker-line-width: 0;" +
                      "marker-width: 12;" +
                    "}" +
                    "[src = 'level4'] {" +
                      "marker-line-width: 0;" +
                      "marker-width:36;" +
                    "}" +
                    "[src = 'level5']    {" +
                      "marker-line-width: 0;" +
                      "marker-width: 48;" +
                    "}" +
                    "[ sentiment_score_avg <= 35676000] {" +
                      "marker-fill: #56E0C3;" +
                    "}" +
                    "[ sentiment_score_avg <= 3.24] {" +
                      "marker-fill: #ECA836;" +
                    "}" +
                    "[ sentiment_score_avg <= 2.74] {" +
                      "marker-fill: #E1695B;" +
                    "}" +
                  "}",
      }]
    })
    .on('done', function(layer){
      // Build our own Tooltip for CartoDB
      // http://bl.ocks.org/ohasselblad/raw/a0e06de1f6f1597c096b/

      sublayer = layer.getSubLayer(0);
      sublayer.setInteraction(true);
      sublayer.setInteractivity('points_count, sentiment_score_avg');

      sublayer.on('featureOver', function(e, latlng, pos, data, layerNumber) {
          component.setState({
            tooltip: {
              data: data,
              styles: {
                bottom: ($(component.refs.map).height()-pos.y+20),
                left: pos.x-80
              }
            },
            mapCursor: "pointer"
          });
      });
      sublayer.on('featureOut', function(e,latlng, pos, data, layerNumber) {
        component.setState({
          tooltip: undefined,
          mapCursor: undefined
        });
      });

      component.setState({clusterLayer: layer});
    })
    .addTo(map);
  },
  reloadMap: function (newProps) {
    this.state.map.removeLayer(this.state.clusterLayer);
    this.loadClusters(newProps);
  },
  createMap: function(newProps) {
    var map = L.map('map', {center: [20,0], zoom: 1});
    var accessToken = 'pk.eyJ1IjoiYW1hbmRhY29zdG9udGVuIiwiYSI6ImNpam9wbG81cDAwd2l0OWtvNDYzZXlidzMifQ.7FcC5_qcn4qb2loFvpmgqw';

    L.tileLayer('https://api.mapbox.com/v4/amandacostonten.2fbbf6ba/{z}/{x}/{y}.png?access_token=' + accessToken, {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    }).addTo(map);

    this.setState({map: map}, function () {
      this.loadClusters(newProps);
    }.bind(this));
  },
  renderMap: function() {
    return <div id="map" ref="map" className="carto-map"></div>
  },
  getSQL: function (newProps) {
    var startDateFormatted = moment(newProps.startDate).format("YYYY-MM-DD HH:mm:ss");
    var endDateFormatted = moment(newProps.endDate).format("YYYY-MM-DD HH:mm:ss");

    return `WITH
        hgridA AS (
          SELECT CDB_HexagonGrid(ST_Expand(!bbox!, greatest(!pixel_width!,!pixel_height!) * 48), greatest(!pixel_width!,!pixel_height!) * 48) as cell
        ),

        level5 AS (
          SELECT * FROM (SELECT ST_Centroid(ST_Collect(i.the_geom_webmercator)) as the_geom_webmercator,
              sum(i.volume) as points_count,
              1 as cartodb_id,
              array_agg(cartodb_id) AS id_list,
              sum(sentiment*volume) /  sum(volume) AS sentiment_score_avg FROM hgridA,
              (select * from mojntbffj4biymymwgg8r77) i
                WHERE ST_Intersects(i.the_geom_webmercator, hgridA.cell)
                AND date > '${startDateFormatted}'
                AND '${endDateFormatted}' > date
                GROUP BY hgridA.cell) t WHERE points_count > 100000 ),

        hgridB AS (
          SELECT CDB_HexagonGrid(ST_Expand(!bbox!, greatest(!pixel_width!,!pixel_height!) * 36), greatest(!pixel_width!,!pixel_height!) * 36) as cell),

        level4 AS (
          SELECT * FROM (SELECT ST_Centroid(ST_Collect(i.the_geom_webmercator)) as the_geom_webmercator,
              sum(i.volume) as points_count,
              1 as cartodb_id, array_agg(cartodb_id) AS id_list,
              sum(sentiment*volume) /  sum(volume) AS sentiment_score_avg FROM hgridB,
              (select * from mojntbffj4biymymwgg8r77) i
                where ST_Intersects(i.the_geom_webmercator, hgridB.cell)
                AND cartodb_id NOT IN (SELECT unnest(id_list) FROM level5)
                AND date > '${startDateFormatted}'
                AND '${endDateFormatted}' > date
                GROUP BY hgridB.cell) t WHERE points_count > 10000 ),

        hgridC AS (
          SELECT CDB_HexagonGrid(ST_Expand(!bbox!, greatest(!pixel_width!,!pixel_height!) * 12), greatest(!pixel_width!,!pixel_height!) * 12) as cell),

        level3 AS (
          SELECT * FROM (SELECT ST_Centroid(ST_Collect(i.the_geom_webmercator)) as the_geom_webmercator,
              sum(i.volume) as points_count,
              1 as cartodb_id, array_agg(cartodb_id) AS id_list,
              sum(sentiment*volume) /  sum(volume) AS sentiment_score_avg FROM hgridC,
              (select * from mojntbffj4biymymwgg8r77) i
                WHERE ST_Intersects(i.the_geom_webmercator, hgridC.cell)
                AND cartodb_id NOT IN (SELECT unnest(id_list) FROM level5)
                AND cartodb_id NOT IN (SELECT unnest(id_list) FROM level4)
                AND date > '${startDateFormatted}'
                AND '${endDateFormatted}' > date
                GROUP BY hgridC.cell) t WHERE points_count > 1000 ),

        hgridD AS (
          SELECT CDB_HexagonGrid(ST_Expand(!bbox!, greatest(!pixel_width!,!pixel_height!) * 8), greatest(!pixel_width!,!pixel_height!) * 8) as cell),

        level2 AS (
          SELECT * FROM (SELECT ST_Centroid(ST_Collect(i.the_geom_webmercator)) as the_geom_webmercator,
              sum(i.volume) as points_count,
              1 as cartodb_id, array_agg(cartodb_id) AS id_list,
              sum(sentiment*volume) /  sum(volume) AS sentiment_score_avg FROM hgridD,
              (select * from mojntbffj4biymymwgg8r77) i
                WHERE ST_Intersects(i.the_geom_webmercator, hgridD.cell)
                AND cartodb_id NOT IN (SELECT unnest(id_list) FROM level5)
                AND cartodb_id NOT IN (SELECT unnest(id_list) FROM level4)
                AND cartodb_id NOT IN (SELECT unnest(id_list) FROM level3)
                AND date > '${startDateFormatted}'
                AND '${endDateFormatted}' > date
                GROUP BY hgridD.cell) t WHERE points_count > 100 )


        SELECT the_geom_webmercator, volume as points_count, cartodb_id, ARRAY[cartodb_id], sentiment AS sentiment_score_avg, 'origin' as src FROM mojntbffj4biymymwgg8r77
                WHERE cartodb_id
                    NOT IN (select unnest(id_list) FROM level5)
                    AND cartodb_id NOT IN (select unnest(id_list) FROM level4)
                    AND cartodb_id NOT IN (select unnest(id_list) FROM level3)
                    AND cartodb_id NOT IN (select unnest(id_list) FROM level2)
                    AND date > '${startDateFormatted}'
                    AND '${endDateFormatted}' > date


        UNION ALL
        SELECT *, 'level5' as src FROM level5
        UNION ALL
        SELECT *, 'level4' as src FROM level4
        UNION ALL
        SELECT *, 'level3' as src FROM level3
        UNION ALL
        SELECT *, 'level2' as src FROM level2`
  },
  render: function() {
    var cartodbTooltip;

    if (this.state.tooltip) {
      cartodbTooltip = (
        <CartodbTooltip tooltip={this.state.tooltip}>
          <p>Sentiment: {this.state.tooltip.data.sentiment_score_avg.toFixed(2)}</p>
          <p>Volume: {_.toShortenedNum(this.state.tooltip.data.points_count)}</p>
        </CartodbTooltip>
      );
    }

    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="global_hotspots" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <div className="drag-handle"></div>
          <div className="top-title">Global Hotspots</div>
        </div>
        <div className="main">
          <div className="legend">
            <div className="legend-item"><div className="legend-point legend-color-4"></div>Negative Sentiment</div>
            <div className="legend-item"><div className="legend-point legend-color-5"></div>Neutral Sentiment</div>
            <div className="legend-item"><div className="legend-point legend-color-6"></div>Positive Sentiment</div>
          </div>
          {this.renderMap()}
          {cartodbTooltip}
        </div>
      </div>
    );
  }
});
