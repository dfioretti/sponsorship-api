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

    var clusterSQL = $('#sql_template_a').html();

    cartodb.createLayer(map, {
      user_name:'amandacoston',
      type:'cartodb',
      sublayers:[{
        sql: clusterSQL,
        cartocss:"#layer{  marker-width: 12;  marker-fill: #5CA2D1;  marker-line-width: 1.5;  marker-fill-opacity: 0.8;  marker-line-opacity: 0;  marker-line-color: #fff; marker-allow-overlap: true;   }   ",
      }]
    })
    .addTo(map);
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
          SELECT * FROM sojcp0flmlm7rshw6usbx27
        </script>
      </div>
    );
  }
});
