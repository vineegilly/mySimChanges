var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );
var Vector2 = dot.Vector2;

function SupportReproducingState() {
  BaseOrganismState.call( this );
}

inherit( BaseOrganismState, SupportReproducingState, {

  /**
   * This is a compliment to reproducing state. Does nothing
   *
   * @param organismStateMachine
   * @param dt
   */
  step: function( organismStateMachine, dt ) {

  },

  /**
   * This is a compliment to reproducing state. Does nothing
   * @param organismStateMachine
   */
  onAnimateMoveEnd: function( organismStateMachine ) {

  },

  entered: function( organismStateMachine ) {

  },

  exit: function() {

  }

} );

module.exports = SupportReproducingState;
