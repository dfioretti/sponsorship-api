var PortfolioMap = React.createClass({
  mixins: [
    RepScoreMixin,
    ChartTooltipHandler
  ],
  getInitialState: function () {
    return {};
  },
  componentDidMount: function() {
    this.renderChart();
  },
  buildChart: function (props) {
    this.renderChart();
  },
  renderChart: function () {
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=us-capitals.json&callback=?', function (json) {
    var data = [];
    $.each(json, function () {
        this.z = this.population;
        data.push(this);
    });

    var H = Highcharts,
          map = H.maps['countries/us/us-all'],
          chart;

//          $('#container').highcharts('Map', {

    chart = new H.Map({
            chart: {
                renderTo: 'container'
            },
            title: {
                text: 'Highmaps lat/lon demo'
            },

            tooltip: {
                pointFormat: '{point.capital}, {point.parentState}<br>' +
                    'Lat: {point.lat}<br>' +
                    'Lon: {point.lon}<br>' +
                    'Population: {point.population}'
            },

            xAxis: {
                crosshair: {
                    zIndex: 5,
                    dashStyle: 'dot',
                    snap: false,
                    color: 'gray'
                }
            },

            yAxis: {
                crosshair: {
                    zIndex: 5,
                    dashStyle: 'dot',
                    snap: false,
                    color: 'gray'
                }
            },

            series: [{
                name: 'Basemap',
                mapData: map,
                borderColor: '#606060',
                nullColor: 'rgba(200, 200, 200, 0.2)',
                showInLegend: false
            }, {
                name: 'Separators',
                type: 'mapline',
                data: H.geojson(map, 'mapline'),
                color: '#101010',
                enableMouseTracking: false,
                showInLegend: false
            }, {
                type: 'mapbubble',
                dataLabels: {
                    enabled: true,
                    format: '{point.capital}'
                },
                name: 'Cities',
                data: data,
                maxSize: '12%',
                color: H.getOptions().colors[0]
            }]
        });

        //chart = $('#container').highcharts();
    });

  },
  render: function() {
    var hiddenStyle = this.props.hidden ? {display: 'none'} : {};
    return (
      <div id="teneo_rep_score" className="dashboard-module" style={hiddenStyle}>
        <div className="top">
          <a className="expand-handle"></a>
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.title}</div>
        </div>
        <div className="main">
          <div style={{height: "230px"}} id="container">
            {this.renderChart()}
          </div>
        </div>
      </div>
    );
  }
});
