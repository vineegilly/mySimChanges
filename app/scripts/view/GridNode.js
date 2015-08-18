var inherit = axon.inherit;
var Node = scenery.Node;
var Shape = kite.Shape;
var Path = scenery.Path;
var Bounds2 = dot.Bounds2;
var EcoSystemConstants = require( '../model/EcoSystemConstants' );

// constants
var NUM_VERTICAL_LINES = 18;
var NUM_HORIZONTAL_LINES = 9;


/**
 *
 * @param {Dimension2} gridDimension
 * @constructor
 */
function GridNode( gridDimension ) {
  var thisGrid = this;
  Node.call( thisGrid );

  var gridShape = new Shape();
  thisGrid.plotGrid = new Path( gridShape, { stroke: 'gray', lineWidth: 0.6 } );

  //vertical grid lines
  for ( var i = 0; i < NUM_VERTICAL_LINES + 1; i++ ) {
    gridShape.moveTo( i * gridDimension.width / NUM_VERTICAL_LINES, 0 );
    gridShape.lineTo( i * gridDimension.width / NUM_VERTICAL_LINES, gridDimension.height );

  }

  //horizontal grid lines
  for ( i = 0; i < NUM_HORIZONTAL_LINES + 1; i++ ) {
    gridShape.moveTo( 0, i * gridDimension.height / NUM_HORIZONTAL_LINES );
    gridShape.lineTo( gridDimension.width, i * gridDimension.height / NUM_HORIZONTAL_LINES );

  }

  thisGrid.addChild( thisGrid.plotGrid );
  thisGrid.organismContentLayerNode = new Node();
  thisGrid.addChild( thisGrid.organismContentLayerNode );

}


inherit( Node, GridNode, {
  /**
   *
   * @param {Node} organismNode
   */
  addOrganism: function( organismNode ) {
    this.organismContentLayerNode.addChild( organismNode );
  },

  removeOrganism: function( organismNode ) {
    this.organismContentLayerNode.removeChild( organismNode );
  },

  getRefPoint: function( globalPoint ) {
    return this.organismContentLayerNode.globalToLocalPoint( globalPoint );
  },

  /**
   *
   * @param point // global point
   * @returns {*}
   */
  isInside: function( point ) {
    var gridRefPoint = this.plotGrid.globalToLocalPoint( point );
    var pointBounds = Bounds2.point( gridRefPoint.x, gridRefPoint.y );
    pointBounds.dilate( EcoSystemConstants.ORGANISM_RADIUS );
    return this.plotGrid.bounds.containsBounds( pointBounds );
  }

} );


module.exports = GridNode;
