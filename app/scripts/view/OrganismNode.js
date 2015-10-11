var Node = scenery.Node;
var inherit = axon.inherit;
var Image = scenery.Image;
var Circle = scenery.Circle;
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
  var appearanceNode = new Image( appearanceImage );
  appearanceNode.scale( EcoSystemConstants.IMAGE_SCALE );
  thisNode.addChild( appearanceNode );

  /*var debugPoint = new Circle( 10, {
   fill: "red",
   opacity:1
   } );

   thisNode.addChild( debugPoint ); */

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