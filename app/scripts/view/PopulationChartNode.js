var inherit = axon.inherit;
var DOM = scenery.DOM;
var Panel = require( '../controls/Panel' );
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var d3 = require( 'd3' );


// constants
var POPULATION_CHART_ID = "populationChartDiv";
var MARGINS = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 50
};

var CHART_WIDTH = EcoSystemConstants.CHART_NODE_DIMENSION.width - 10;
var CHART_HEIGHT = EcoSystemConstants.CHART_NODE_DIMENSION.height - 10;

var data = [ {
  "sale": "202",
  "year": "2000"
}, {
  "sale": "215",
  "year": "2001"
}, {
  "sale": "179",
  "year": "2002"
}, {
  "sale": "199",
  "year": "2003"
}, {
  "sale": "134",
  "year": "2003"
}, {
  "sale": "176",
  "year": "2010"
} ];

function PopulationChartNode() {
  var thisPanel = this;
  var element = document.createElement( 'div' );
  $( element ).attr( 'id', POPULATION_CHART_ID );


  element.style.width = EcoSystemConstants.CHART_NODE_DIMENSION.width;
  element.style.height = EcoSystemConstants.CHART_NODE_DIMENSION.height;
  var domContent = new DOM( element );
  var populationChartDiv = d3.select( element );

  var svgSelection = populationChartDiv.append( "svg" )
    .attr( "width", CHART_WIDTH )
    .attr( "height", CHART_HEIGHT );

  this.buildChart( svgSelection );

  // vertical panel
  Panel.call( thisPanel, domContent, {
    // panel options
    fill: EcoSystemConstants.GRID_BACKGROUND_COLOR,
    resize: false,
    yMargin: 5,
    cornerRadius: 0
  } );

}

inherit( Panel, PopulationChartNode, {

  buildChart: function( svgSelection ) {
    var xScale = d3.scale.linear()
      .range( [ MARGINS.left, CHART_WIDTH - MARGINS.right ] )
      .domain( [ 0, EcoSystemConstants.MAX_PLAY_TIME ] );

    // number of organisms
    var yScale = d3.scale.linear().range( [ CHART_HEIGHT - MARGINS.top, MARGINS.bottom ] ).domain( [ 0, EcoSystemConstants.MAX_ORGANISMS ] );

    var xAxis = d3.svg.axis()
      .scale( xScale )
      .ticks( 5 );

    var yAxis = d3.svg.axis()
      .scale( yScale )
      .orient( "left" )
      .ticks( 5 );

    svgSelection.append( "svg:g" )
      .attr( "transform", "translate(0," + (CHART_HEIGHT - MARGINS.bottom) + ")" )
      .call( xAxis );

    svgSelection.append( "svg:g" )
      .attr( "transform", "translate(" + (MARGINS.left) + ",0)" )
      .call( yAxis );
  }


} );

module.exports = PopulationChartNode;

