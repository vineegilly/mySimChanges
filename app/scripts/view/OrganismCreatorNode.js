var inherit = axon.inherit;
var Node = scenery.Node;
var SimpleDragHandler = scenery.SimpleDragHandler;

/**
 *
 * @param {Node} appearanceNode
 * @param {Node} canvas
 * @param organismCreator
 * @constructor
 */
function OrganismCreatorNode( appearanceNode, canvas, organismCreator, organismDestroyer, enclosingPanelNode ) {
  var thisNode = this;
  Node.call( thisNode, { cursor: 'pointer' } );
  thisNode.appearanceNode = appearanceNode;
  thisNode.organism = null;
  thisNode.canvas = canvas;

  appearanceNode.pickable = false;
  thisNode.mouseArea = appearanceNode.bounds;
  thisNode.touchArea = appearanceNode.bounds;

  thisNode.addInputListener( new SimpleDragHandler( {

    allowTouchSnag: true,
    start: function( event ) {
      thisNode.pickable = false;
      thisNode.appearanceNode.opacity = 0.3;

      var modelPos = thisNode.getModelPosition( event.pointer.point );
      //   thisNode.debugPoint(thisNode.canvas,modelPos); TODO Debug

      thisNode.organism = organismCreator( modelPos );
      thisNode.organism.userControlled = true;

      // Add an observer to watch for this model element to be returned.

      var userControlledPropertyObserver = function( userControlled ) {
        if ( !userControlled ) {
          // The user has released this biomolecule.  If it  was dropped above the return bounds (which are
          // generally the bounds of the tool box where this creator node resides),then the model element
          // should be removed from the model.
          if ( enclosingPanelNode.bounds.containsPoint( thisNode.organism.getPosition() ) ) {
            organismDestroyer( thisNode.organism );
            thisNode.organism.userControlledProperty.unlink( userControlledPropertyObserver );
            thisNode.appearanceNode.opacity = 1;
            thisNode.pickable = true;
          }
        }
      };

      thisNode.organism.userControlledProperty.link( userControlledPropertyObserver );
    },

    translate: function( translationParams ) {
      thisNode.organism.setPosition( thisNode.organism.getPosition().plus( translationParams.delta ) );
    },

    end: function( event ) {
      thisNode.organism.userControlled = false;
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