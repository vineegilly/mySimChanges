/**
 * The main model containing - EcoSystem
 * @author Sharfudeen Ashraf
 *
 */

var inherit = core.inherit;
var Bounds2 = dot.Bounds2;
var BaseScreenView = require( '../core/BaseScreenView' );

function EcoSystemView( model ) {
  var thisView = this;
  BaseScreenView.call( thisView, { layoutBounds: new Bounds2( 0, 0, 981, 604 ) } );

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