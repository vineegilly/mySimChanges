var Node = scenery.Node;
var inherit = axon.inherit;
var Image = scenery.Image;
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var OrganismImageCollection = require( '../model/organisms/OrganismImageCollection' );

/**
 *
 * @param {OrganismModel} organismModel
 * @constructor
 */
function OrganismNode( organismModel ) {
  var thisNode = this;
  Node.call( thisNode );
  var appearanceImage = OrganismImageCollection.getRepresentation( organismModel.name );
  var appearanceNode = new Image( appearanceImage);
  thisNode.addChild( appearanceNode );
  appearanceNode.scale( EcoSystemConstants.IMAGE_SCALE );
  organismModel.positionProperty.link( function( newPos ) {
    thisNode.center = newPos;
  } );


  organismModel.opacityProperty.link( function( newOpacity ) {
    thisNode.opacity = newOpacity;
  } );


  organismModel.scaleProperty.link( function( newScale ) {
    thisNode.scale( newScale );
  } );


}

inherit( Node, OrganismNode );


module.exports = OrganismNode;