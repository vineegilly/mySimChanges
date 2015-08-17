var inherit = axon.inherit;
var SimFont = require( '../core/SimFont' );
var Node = scenery.Node;
var Panel = require( '../controls/Panel' );
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var VBox = scenery.VBox;
var Dimension2 = dot.Dimension2;
var GridNode = require( './GridNode' );

// private constants
var GRID_NODE_DIMENSION = new Dimension2( 930, 360 );

function GridPanelNode() {
  var thisPanelNode = this;
  thisPanelNode.gridNode = new GridNode( GRID_NODE_DIMENSION );
  var panelChildren = [ thisPanelNode.gridNode ];
  // vertical panel
  Panel.call( this, thisPanelNode.gridNode, {
    // panel options
    fill: EcoSystemConstants.GRID_BACKGROUND_COLOR,
    resize: false,
    cornerRadius: 0,
    xMargin: 0,
    yMargin: 0

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

  getRefPoint: function(point) {
    return this.gridNode.getRefPoint(point);
  },

  isInside:function(point){
    return this.gridNode.isInside(point);
  }

} );

module.exports = GridPanelNode;







