var inherit = axon.inherit;
var SimFont = require( '../core/SimFont' );
var Node = scenery.Node;
var Panel = require( '../controls/Panel' );
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var VBox = scenery.VBox;
var Dimension2 = dot.Dimension2;
var GridNode = require( './GridNode' );

// private constants
var GRID_NODE_DIMENSION = new Dimension2( 960, 380 );

function GridPanelNode() {
  var thisPanelNode = this;
  thisPanelNode.gridNode = new GridNode( GRID_NODE_DIMENSION );
  var panelChildren = [ thisPanelNode.gridNode ];
  // vertical panel
  Panel.call( this, thisPanelNode.gridNode , {
    // panel options
    fill: EcoSystemConstants.GRID_BACKGROUND_COLOR,
    resize:false

  } );
}

inherit( Panel, GridPanelNode, {

  /**
   *
   * @param {Node} organismNode
   */
  addOrganism: function( organismNode ) {
    this.gridNode.addOrganism( organismNode );
  },

  removeOrganism: function( organismNode ) {
    this.gridNode.removeOrganism( organismNode );
  },


  getOrganismLayerNode: function() {
    return this.gridNode.getOrganismLayerNode();
  }


} );

module.exports = GridPanelNode;







