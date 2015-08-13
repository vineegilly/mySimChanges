/**
 * The main model containing - EcoSystem
 * @author Sharfudeen Ashraf
 *
 */

var inherit = core.inherit;
var Bounds2 = dot.Bounds2;
var BaseScreenView = require( '../core/BaseScreenView' );
var SimpleDragHandler = scenery.SimpleDragHandler;
var CARNIVORES_IMAGE = require( "../../assets/images/carnivores.png" );
function EcoSystemView( model ) {
  var thisView = this;
  BaseScreenView.call( thisView, { layoutBounds: new Bounds2( 0, 0, 981, 604 ) } );
  var image1 = new scenery.Image( CARNIVORES_IMAGE );
  thisView.addChild( image1 );

  // add a drag handler to each node
  image1.addInputListener( new SimpleDragHandler( {
    // allow moving a pointer (touch) across a node to pick it up
    allowTouchSnag: true,

    translate: function( translationParams ) {
      var thisHandler = this;
      // How far it has moved from the original position
      var delta = translationParams.delta;
      image1.leftTop = image1.leftTop.plus( delta );

    }
  } ) );

}

inherit( BaseScreenView, EcoSystemView, {
  /**
   * view related animation
   * @param dt
   */
  step: function( dt ) {

  }
} );


module.exports = EcoSystemView;