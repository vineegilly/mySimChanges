var inherit = axon.inherit;
var Node = scenery.Node;
var Shape = kite.Shape;
var Path = scenery.Path;

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
  var plotGrid = new Path( gridShape, { stroke: 'gray', lineWidth: 0.6 } );

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

  thisGrid.addChild( plotGrid );
  var chartContentNode = new Node();
  thisGrid.addChild( chartContentNode );


}


inherit( Node, GridNode );


module.exports = GridNode;
