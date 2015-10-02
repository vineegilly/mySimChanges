var inherit = axon.inherit;
var Dimension2 = dot.Dimension2;
var SimFont = require( '../core/SimFont' );
var Text = scenery.Text;
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var BooleanRectangularToggleButton = require( '../controls/buttons/BooleanRectangularToggleButton' );
var RectangularButtonView = require( '../controls/buttons/RectangularButtonView' );
var RectangularPushButton = require( '../controls/buttons/RectangularPushButton' );
var Color = scenery.Color;
var HBox = scenery.HBox;

var BUTTON_TEXT_OPTIONS = { font: new SimFont( 22 ) };
var PLAY_STR = "Play";
var PAUSE_STR = "Pause";
var CLEAR_STR = "Clear";

/**
 *
 * @param playPauseProperty
 * @param onClearPlay
 * @constructor
 */
function PlayerBox( playPauseProperty, onClearPlay ) {
  var thisBox = this;

  var playTextNode = new Text( PLAY_STR, BUTTON_TEXT_OPTIONS );
  var pauseTextNode = new Text( PAUSE_STR, BUTTON_TEXT_OPTIONS );
  var clearTextNode = new Text( CLEAR_STR, BUTTON_TEXT_OPTIONS );

  var playerItems = [];

  var playPauseButton = new BooleanRectangularToggleButton( pauseTextNode, playTextNode, playPauseProperty, {
    buttonAppearanceStrategy: RectangularButtonView.threeDAppearanceStrategy,
    xMargin: 10, // should be visibly greater than yMargin, see issue #109
    yMargin: 10,
    baseColor: new Color( 239, 239, 195 ),
    stroke: null,
    lineWidth: 0 // Only meaningful if stroke is non-null
  } );

  var options = {
    buttonAppearanceStrategy: RectangularButtonView.threeDAppearanceStrategy,
    xMargin: 10, // should be visibly greater than yMargin, see issue #109
    yMargin: 10,
    baseColor: new Color( 239, 239, 195 ),
    stroke: null,
    content: clearTextNode,
    lineWidth: 0, // Only meaningful if stroke is non-null,
    listener: function() {
      onClearPlay();
    }
  };

  var clearButton = new RectangularPushButton( options );

  playerItems.push( playPauseButton );
  playerItems.push( clearButton );


  HBox.call( thisBox, {
    children: playerItems,
    spacing: 20
  } );

}

inherit( HBox, PlayerBox, {} );


module.exports = PlayerBox;

