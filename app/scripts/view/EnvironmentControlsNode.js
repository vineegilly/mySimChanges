var inherit = axon.inherit;
var Node = scenery.Node;
var Property = axon.Property;
var SimFont = require( '../core/SimFont' );
var CheckBox = require( '../controls/CheckBox' );
var HSlider = require( '../controls/HSlider' );
var Text = scenery.Text;
var HBox = scenery.HBox;
var VBox = scenery.VBox;
var Dimension2 = dot.Dimension2;
var Panel = require( '../controls/Panel' );
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var TitleBarNode = require( './TitleBarNode' );
var PlayerBox = require( './PlayerBox' );

// constants
var CHECK_BOX_OPTIONS = { boxWidth: 30 };
var CONTROL_TEXT_OPTIONS = { font: new SimFont( 15 ) };
var POPULATION_TEXT_OPTIONS = { font: new SimFont( 25 ) };
var POPULATION_RANGE_STR = "Population Range";
var RAIN_STR = "Rain";
var SUN_LIGHT_STR = "Sun Light";
var ENVIRONMENTAL_CONTROLS_STR = "Environment Controls";
var TITLE_SIZE = new Dimension2( 200, 30 );

function EnvironmentControlsNode( ecoSystemModel, populationChartNode ) {
  var thisPanel = this;

  var sunLightProperty = ecoSystemModel.sunLightProperty;
  var rainProperty = ecoSystemModel.rainProperty;
  var populationRangeProperty = ecoSystemModel.populationRangeProperty;
  var populationRangeSlider = new HSlider( populationRangeProperty, { min: 1, max: 5 } );

  var populationRangeIndicator = new Text( populationRangeProperty.get(), POPULATION_TEXT_OPTIONS );
  var populationSliderBox = new HBox( {
    spacing: 15,
    children: [ populationRangeSlider, populationRangeIndicator ],
    resize: false
  } );

  populationRangeProperty.link( function( populationRangeValue ) {
    populationRangeIndicator.text = Number( populationRangeValue ) | 0;
  } );


  var checkBoxes = [];
  var rainCheckBoxControl = new CheckBox( new Text( RAIN_STR, CONTROL_TEXT_OPTIONS ),
    rainProperty, CHECK_BOX_OPTIONS );
  var sunLightBoxControl = new CheckBox( new Text( SUN_LIGHT_STR, CONTROL_TEXT_OPTIONS ),
    sunLightProperty, CHECK_BOX_OPTIONS );
  checkBoxes.push( rainCheckBoxControl );
  checkBoxes.push( sunLightBoxControl );
  var checkBoxControlBox = new HBox( {
    children: checkBoxes,
    spacing: 20
  } );

  ecoSystemModel.playPauseProperty.link( function( playPause ) {
    populationRangeSlider.enabled = !playPause;

  } );

  var titleBarNode = new TitleBarNode( TITLE_SIZE, ENVIRONMENTAL_CONTROLS_STR );
  var playerBox = new PlayerBox( ecoSystemModel.playPauseProperty, function() {
    populationChartNode.clearChart();
    ecoSystemModel.onClearPlay();
    populationRangeProperty.set( 1 );
  } );
  var panelContents = new VBox( {
    children: [ titleBarNode, populationSliderBox, checkBoxControlBox, playerBox ],
    spacing: 18,
    resize: false
  } );


  // vertical panel
  Panel.call( thisPanel, panelContents, {
    // panel options
    fill: EcoSystemConstants.GRID_BACKGROUND_COLOR,
    resize: false,
    yMargin: 5,
    cornerRadius: 0
  } );
}

inherit( Panel, EnvironmentControlsNode, {} );

module.exports = EnvironmentControlsNode;