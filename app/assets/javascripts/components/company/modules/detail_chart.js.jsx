var DetailChart = React.createClass({
  getInitialState: function() {
    return {graphId: uuid.v4(), view: "avg"}
  },
  componentWillMount: function() {

  },
  componentWillReceiveProps: function(newProps) {
    console.log(newProps.data.data_type);
    // console.log(newProps.companyData);
    var companyData = $.map(newProps.companyData.slice(-100,100), function(point) {
      if (typeof(point[newProps.data.data_type]) != "undefined") {
        return {x: new Date(point.date), y: point[newProps.data.data_type]};
      }
    });
    // console.log('******************');
    // console.log(companyData);

    var data = {
      series: [{
        name: 'main',
        data: companyData
      }, {
        name: 'test',
        data: [
          { x: new Date(2011, 01, 1), y: 50},
          { x: new Date(2011, 02, 3), y: 23},
          { x: new Date(2011, 03, 5), y: 12},
          { x: new Date(2011, 04, 7), y: 20},
          { x: new Date(2011, 05, 11), y: 33},
          { x: new Date(2011, 06, 13), y: 26},
          { x: new Date(2011, 07, 20), y: 43},
          { x: new Date(2012, 03, 21), y: 31},
          { x: new Date(2013, 02, 25), y: 23},
          { x: new Date(2013, 15, 27), y: 26}
        ]
      }]
    }

    var options = {
      axisX: {
        type: Chartist.FixedScaleAxis,
        divisor: 8,
        labelInterpolationFnc: function(value) {
          return moment(value).format('MMM YYYY');
        }
      },
      axisY: {
      },
      showPoint: true,
      lineSmooth: false,
      fullWidth: true,
      chartPadding: 0,
      plugins: [
        Chartist.plugins.tooltip()
      ]
    }

    var chart;

    if (typeof(this.state.chart) == "undefined") {
      chart = new Chartist.Line('.ct-chart-'+this.state.graphId, data, options);
      this.setState({chart: chart}, function(){
        this.setupTooltip();
      }.bind(this));
    } else {
      console.log("existing chart");
      console.log(this.state.chart);
      this.state.chart.update(data);
    }
    // chart.on('draw', function(data) {
    //   if(data.type === 'line') {
    //     data.element.animate({
    //       'stroke-dashoffset': {
    //         dur: 2000,
    //         from: 30000,
    //         to: 0
    //       }
    //     });
    //   }
    // });
  },
  componentDidMount: function() {
    // console.log(this.props);
    // DUMMY DATA

  },
  setupTooltip: function() {
    console.log(this.state.chart);
    $(this.state.chart.container).on("mousemove", function(e) {
      console.log($(e.target).find('.ct-series'));
      $.each($(e.target).find('.ct-series'), function(i, series) {
        console.log($(series).find('.ct-point'));
        $.each($(series).find('.ct-point'), function(i, point) {

        });
      });
      console.log(e.offsetX, e.offsetY);
    });
  },
  renderLegend: function() {
    return (
      <div className="chart-legend">
        <div className="company-legend"><span className="legend-color"></span>{this.props.company.name}</div>
        <div className="other-legend"><span className="legend-color"></span>Industry Average</div>
      </div>
    );
  },
  render: function() {
    // console.log(this.props)
    var cn = "graph ct-chart-" + this.state.graphId;
    return (
      <div id="" className="detail-module detail-chart">
        <div className="top">
          <div className="filters">
            <div className="filter average-filter">Comps Average <span className="caret"></span></div>
            <div className="filter comp-filter">Comps <span className="caret"></span></div>
          </div>
          <div className="drag-handle"></div>
          <div className="top-title">{this.props.data.data_type_display_name}</div>
        </div>
        <div className="main">
          {this.renderLegend()}
          <div id={this.state.graphId} className={cn}></div>
        </div>
      </div>
    );
  }
});
