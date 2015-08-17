/**
 * The ButtonListener is a scenery Input Listener that translates input events
 * (down, up, enter, exit) into states in a button model.  Duck typing is used
 * for the buttonModel, it can be anything with "down" and "over" boolean properties,
 * such as a PushButtonModel or a StickyToggleButtonModel.
 *
 * One assumption of this ButtonListener is that only one pointer can interact
 * with the button at a time, and the other pointers are effectively "locked
 * out" while another pointer is using the button.
 */


// modules
var DownUpListener = scenery.DownUpListener;
var Input = scenery.Input;
var inherit = axon.inherit;

/**
 * @param {*} buttonModel any object with 'down' and 'over' boolean properties
 * @constructor
 */
function ButtonListener( buttonModel ) {
  this.buttonModel = buttonModel; // @private
  var buttonListener = this;

  // Track the pointer that is currently interacting with this button, ignore others.
  this.overPointer = null; // @private
  this.downPointer = null; // @private

  DownUpListener.call( this, {
      down: function( event, trail ) {
        if ( buttonListener.downPointer === null ) {
          buttonListener.downPointer = event.pointer;
        }
        if ( event.pointer === buttonListener.downPointer ) {
          buttonModel.down = true;
        }
      },

      up: function( event, trail ) {
        if ( event.pointer === buttonListener.downPointer ) {
          buttonListener.downPointer = null;
          buttonModel.down = false;
        }
      }
    }
  );
}

inherit( DownUpListener, ButtonListener, {
  /**
   * When this Button has focus, pressing a key down presses the button.  This is part of the accessibility feature set.
   * This API is subject to change (if we make a more specific ENTER/SPACE callback
   * @param {Event} event
   * @param {Trail} trail
   */
  keydown: function( event, trail ) {
    if ( event.domEvent.keyCode === Input.KEY_ENTER || event.domEvent.keyCode === Input.KEY_SPACE ) {
      this.enter( event, trail );
      this.buttonModel.down = true;
    }
  },

  /**
   * When this Button has focus, pressing a key up releases the button.  This is part of the accessibility feature set.
   * This API is subject to change (if we make a more specific ENTER/SPACE callback
   * @param {Event} event
   * @param {Trail} trail
   */
  keyup: function( event, trail ) {
    if ( event.domEvent.keyCode === Input.KEY_ENTER || event.domEvent.keyCode === Input.KEY_SPACE ) {
      this.buttonModel.down = false;
      this.exit( event, trail );
    }
  },
  enter: function( event, trail ) {
    if ( this.overPointer === null ) {
      this.overPointer = event.pointer;
      this.buttonModel.over = true;
    }
  },

  exit: function( event, trail ) {
    if ( event.pointer === this.overPointer ) {
      this.overPointer = null;
      this.buttonModel.over = false;
    }
  }
} );

module.exports = ButtonListener;