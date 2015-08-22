var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );
var Vector2 = dot.Vector2;

function EatingState() {
  BaseOrganismState.call( this );
}

inherit( BaseOrganismState, EatingState, {

  step: function( organismStateMachine, dt ) {
    var organism = organismStateMachine.organismModel;
    if ( !organism.userControlled ) {
      this.animateMovementStep( organismStateMachine, dt );
    }
  },

  onAnimateMoveEnd: function( organismStateMachine ) {
    organismStateMachine.goToRest();
  },

  entered: function( organismStateMachine ) {

  },

  exit: function() {

  }

} );


module.exports = EatingState;
