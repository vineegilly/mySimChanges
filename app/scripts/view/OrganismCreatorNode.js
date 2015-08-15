var inherit = axon.inherit;
var Node = scenery.Node;
var SimpleDragHandler = scenery.SimpleDragHandler;

/**
 *@param {string} type
 * @param {Node} gridCanvas
 * @param {Image} appearanceNode
 * @param {Node} screenView
 * @param organismCreator
 * @param {Function} canPlaceShape - A function to determine if the Organism can be placed on the board
 * @constructor
 */
function OrganismCreatorNode( type, gridCanvas, appearanceImage, screenView, organismCreator, canPlaceShape ) {
  var thisNode = this;
  Node.call( thisNode, { cursor: 'pointer' } );

  var appearanceNode = new scenery.Image( appearanceImage );
  appearanceNode.scale( 0.15,0.15 );
  thisNode.appearanceNode = appearanceNode;
  thisNode.organism = null;
  thisNode.mouseArea = appearanceNode.bounds;
  thisNode.touchArea = appearanceNode.bounds;

  thisNode.addInputListener( new SimpleDragHandler( {

    allowTouchSnag: true,
    start: function( event ) {

      // Determine the initial position of the new element as a function of the event position and this node's bounds.
      var upperLeftCornerGlobal = thisNode.parentToGlobalPoint( thisNode.leftTop );
      var initialPositionOffset = upperLeftCornerGlobal.minus( event.pointer.point );
      var initialPosition = gridCanvas.globalToLocalPoint( event.pointer.point.plus( initialPositionOffset ) );

      thisNode.organism = organismCreator( type, appearanceImage, initialPosition );
      thisNode.organism.userControlled = true;
    },

    translate: function( translationParams ) {
      thisNode.organism.setPosition( thisNode.organism.getPosition().plus( translationParams.delta ) );
    },

    end: function( event ) {
      var droppedPoint = event.pointer.point;
      var droppedScreenPoint = screenView.globalToLocalPoint( event.pointer.point );

      //check if the user has dropped the number within the panel itself, if "yes" return to origin
      if ( !canPlaceShape( thisNode.organism, droppedScreenPoint ) ) {
        thisNode.organism.returnToOrigin( true );
        thisNode.organism = null;
        return;
      }

      thisNode.organism = null;
    }

  } ) );


  // Add the main node with which the user will interact.
  thisNode.addChild( appearanceNode );

}


inherit( Node, OrganismCreatorNode, {

  getModelPosition: function( point ) {
    var canvasPosition = this.canvas.globalToLocalPoint( point );
    return canvasPosition;
  }


} );


module.exports = OrganismCreatorNode;