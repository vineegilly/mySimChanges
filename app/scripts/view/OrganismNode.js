var Node = scenery.Node;
var inherit = axon.inherit;
var Image = scenery.Image;

/**
 *
 * @param {OrganismModel} organismModel
 * @constructor
 */
function OrganismNode( organismModel ) {
  var thisNode = this;
  Node.call( thisNode );
  var appearanceNode = new Image( organismModel.appearanceImage );
  thisNode.addChild( appearanceNode );
  appearanceNode.scale( 0.15, 0.15 );

  organismModel.positionProperty.link( function( newPos ) {
    thisNode.leftTop = newPos;
  } );

}

inherit( Node, OrganismNode );


module.exports = OrganismNode;