/**
 * The main model containing - EcoSystem
 * @author Sharfudeen Ashraf
 *
 */

var inherit = axon.inherit;
var Bounds2 = dot.Bounds2;
var BaseScreenView = require( '../core/BaseScreenView' );
var SimFont = require( '../core/SimFont' );
var Text = scenery.Text;
var SimpleDragHandler = scenery.SimpleDragHandler;
var CARNIVORES_IMAGE = require( "../../assets/images/carnivores.png" );
var CheckBox = require( '../controls/CheckBox' );
var HSlider = require( '../controls/HSlider' );
var Property = axon.Property;

var CHECK_BOX_OPTIONS = { boxWidth: 40 };
var TEXT_OPTIONS = { font: new SimFont( 14 ) };


var testString = "Check Me";

function EcoSystemView( model ) {
  var thisView = this;
  BaseScreenView.call( thisView, { layoutBounds: new Bounds2( 0, 0, 981, 604 ) } );
  var image1 = new scenery.Image( CARNIVORES_IMAGE );
   thisView.addChild( image1 );

  var property = new Property( 130 );

  var slider = new HSlider( property, { min: 100, max: 150 } );

  var checkBoxControl = new CheckBox( new Text( testString, TEXT_OPTIONS ), property, CHECK_BOX_OPTIONS );
  thisView.addChild( checkBoxControl );

  checkBoxControl.x = thisView.layoutBounds.center.x;
  checkBoxControl.y = thisView.layoutBounds.center.y;

  // circle
  thisView.addChild( new scenery.Path( kite.Shape.circle( 50, 50, 40 ), {// center X, center Y, radius
    fill: '#0ff',
    stroke: '#000'
  } ) );


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