var inherit = axon.inherit;
var Dimension2 = dot.Dimension2;
var Panel = require( '../controls/Panel' );
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var HBox = scenery.HBox;

// constants
var PANEL_SIZE = new Dimension2( 100, 60 );

function PlayerPanel() {
  var thisPanel = this;

  var playerItems = [];


  var playerBox = new HBox( {
    children: playerItems,
    spacing: 30
  } );

  // vertical panel
  Panel.call( thisPanel, playerBox, {
    // panel options
    fill: EcoSystemConstants.GRID_BACKGROUND_COLOR,
    resize: false,
    yMargin: 5,
    cornerRadius: 0
  } );

}


inherit( Panel, PlayerPanel, {} );

module.exports = PlayerPanel;
