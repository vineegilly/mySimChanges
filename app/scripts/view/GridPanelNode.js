var inherit = axon.inherit;
var SimFont = require( '../core/SimFont' );
var Node = scenery.Node;
var Panel = require( '../controls/Panel' );
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var VBox = scenery.VBox;
var Dimension2 = dot.Dimension2;
var GridNode = require( './GridNode' );

// private constants
var GRID_NODE_DIMENSION = new Dimension2( 700, 350 );

function GridPanelNode() {

  var gridNode = new GridNode(GRID_NODE_DIMENSION);
  var panelChildren = [ gridNode ];
  // vertical panel
  Panel.call( this, new VBox( {
    children: panelChildren,
    align: 'left',
    spacing: 7
  } ), {
    // panel options
    fill: EcoSystemConstants.GRID_BACKGROUND_COLOR

  } );
}

inherit( Panel, GridPanelNode );

module.exports = GridPanelNode;







