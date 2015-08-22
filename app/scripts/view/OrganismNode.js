var Node = scenery.Node;
var inherit = axon.inherit;
var Image = scenery.Image;
var EcoSystemConstants = require( '../model/EcoSystemConstants' );

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
  appearanceNode.scale( EcoSystemConstants.IMAGE_SCALE );
  organismModel.positionProperty.link( function( newPos ) {
    thisNode.center = newPos;
  } );

}

inherit( Node, OrganismNode );


module.exports = OrganismNode;