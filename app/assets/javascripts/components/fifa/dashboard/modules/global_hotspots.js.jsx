var GlobalHotspots = React.createClass({
  componentWillMount: function() {
  },
  componentDidMount: function() {
    this.createMap();
  },
  createMap: function() {
    var map = L.map('map', {center: [36,0], zoom: 3});
    var accessToken = 'pk.eyJ1IjoiYW1hbmRhY29zdG9udGVuIiwiYSI6ImNpam9wbG81cDAwd2l0OWtvNDYzZXlidzMifQ.7FcC5_qcn4qb2loFvpmgqw';

    L.tileLayer('https://api.mapbox.com/v4/amandacostonten.2fbbf6ba/{z}/{x}/{y}.png?access_token=' + accessToken, {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    }).addTo(map);

    var clusterSQL = he.decode($('#sql_template_a').html(), {
      'strict': true
    });

    cartodb.createLayer(map, {
      user_name:'ernestomb',
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
                    "[src = 'smalls'] {" +
                      "marker-line-width: 0;" +
                      "marker-width: 12;" +
                    "}" +
                    "[src = 'mids'] {" +
                      "marker-line-width: 0;" +
                      "marker-width:36;" +
                    "}" +
                    "[src = 'bigs']    {" +
                      "marker-line-width: 0;" +
                      "marker-width: 48;" +
                    "}" +
                    "[ average <= 35676000] {" +
                      "marker-fill: #BD0026;" +
                    "}" +
                    "[ average <= 300424] {" +
                      "marker-fill: #F03B20;" +
                    "}" +
                    "[ average <= 111461] {" +
                      "marker-fill: #FD8D3C;" +
                    "}" +
                    "[ average <= 47653] {" +
                      "marker-fill: #FECC5C;" +
                    "}" +
                    "[ average <= 15601] {" +
                      "marker-fill: #FFFFB2;" +
                    "}" +
                  "}",
      }]
    }).addTo(map);

    // cartodb.createLayer(map, {
    //   user_name:'amandacoston',
    //   type:'cartodb',
    //   sublayers:[{
    //     sql: clusterSQL,
    //     // cartocss: "#layer{  marker-width: 12;  marker-fill: #5CA2D1;  marker-line-width: 1.5;  marker-fill-opacity: 0.8;  marker-line-opacity: 0;  marker-line-color: #fff; marker-allow-overlap: true;  [src = 'smalls'] {marker-line-width: 0;    marker-width: 12;  }   [src = 'mids'] {    marker-line-width: 0;   marker-width:36;  }  [src = 'bigs']    {marker-line-width: 0;    marker-width: 48;  } [ average <= 35676000] {   marker-fill: #BD0026;}  [ average <= 300424] {   marker-fill: #F03B20;}  [ average <= 111461] {   marker-fill: #FD8D3C;}  [ average <= 47653] {   marker-fill: #FECC5C;}  [ average <= 15601] {   marker-fill: #FFFFB2;}  }"
    //     cartocss:"#layer{  marker-width: 12;  marker-fill: #5CA2D1;  marker-line-width: 1.5;  marker-fill-opacity: 0.8;  marker-line-opacity: 0;  marker-line-color: #fff; marker-allow-overlap: true;   }   ",
    //   }]
    // }).addTo(map);
    // .done(function (e) {
    //   console.log(e)
    // })
    // .error(function (e) {
    //   console.log(e)
    // })
    // .on('done', function(layer){
    //  cdb.vis.Vis.addInfowindow(map,layer.getSubLayer(0), ['points_count', 'average'],{infowindowTemplate: $('#infowindow_template').html()});
    // })

  },
  renderMap: function() {
    return <div id="map" className="carto-map"></div>
  },
  render: function() {
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
        </div>
        <script type="sql/html" id="sql_template_a">
          WITH
          hgridA AS (SELECT CDB_HexagonGrid(ST_Expand(!bbox!, greatest(!pixel_width!,!pixel_height!) * 48), greatest(!pixel_width!,!pixel_height!) * 48) as cell),

          bigs AS (SELECT * FROM (SELECT ST_Centroid(ST_Collect(i.the_geom_webmercator)) as the_geom_webmercator, count(i.cartodb_id) as points_count, 1 as cartodb_id, array_agg(cartodb_id) AS id_list, avg(pop_max) AS average FROM hgridA, (select * from ne_10m_populated_places_simple_7_copy) i where ST_Intersects(i.the_geom_webmercator, hgridA.cell) GROUP BY hgridA.cell) t WHERE points_count > 100 ),

          hgridB AS (SELECT CDB_HexagonGrid(ST_Expand(!bbox!, greatest(!pixel_width!,!pixel_height!) * 36), greatest(!pixel_width!,!pixel_height!) * 36) as cell),

          mids AS (SELECT * FROM (SELECT ST_Centroid(ST_Collect(i.the_geom_webmercator)) as the_geom_webmercator, count(i.cartodb_id) as points_count, 1 as cartodb_id, array_agg(cartodb_id) AS id_list, avg(pop_max) AS average FROM hgridB, (select * from ne_10m_populated_places_simple_7_copy) i where ST_Intersects(i.the_geom_webmercator, hgridB.cell) AND cartodb_id NOT IN (SELECT unnest(id_list) FROM bigs) GROUP BY hgridB.cell) t WHERE points_count > 25 ),

          hgridC AS (SELECT CDB_HexagonGrid(ST_Expand(!bbox!, greatest(!pixel_width!,!pixel_height!) * 12), greatest(!pixel_width!,!pixel_height!) * 12) as cell),

          smalls AS (SELECT * FROM (SELECT ST_Centroid(ST_Collect(i.the_geom_webmercator)) as the_geom_webmercator, count(i.cartodb_id) as points_count, 1 as cartodb_id, array_agg(cartodb_id) AS id_list, avg(pop_max) AS average FROM hgridC, (select * from ne_10m_populated_places_simple_7_copy) i where ST_Intersects(i.the_geom_webmercator, hgridC.cell) AND cartodb_id NOT IN (SELECT unnest(id_list) FROM bigs) AND cartodb_id NOT IN (SELECT unnest(id_list) FROM mids) GROUP BY hgridC.cell) t WHERE points_count > 1 )

          SELECT the_geom_webmercator, 1 points_count, cartodb_id, ARRAY[cartodb_id], pop_max AS average, 'origin' as src FROM ne_10m_populated_places_simple_7_copy WHERE cartodb_id NOT IN (select unnest(id_list) FROM bigs) AND cartodb_id NOT IN (select unnest(id_list) FROM mids) AND cartodb_id NOT IN (select unnest(id_list) FROM smalls)

          UNION ALL
          SELECT *, 'bigs' as src FROM bigs
          UNION ALL
          SELECT *, 'mids' as src FROM mids
          UNION ALL
          SELECT *, 'smalls' as src FROM smalls
        </script>
      </div>
    );
  }
});
