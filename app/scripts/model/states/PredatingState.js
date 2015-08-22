var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );
var Vector2 = dot.Vector2;

function PredatingState() {
  BaseOrganismState.call( this );
}

inherit( BaseOrganismState, PredatingState, {

  step: function( organismStateMachine, dt ) {
    var organism = organismStateMachine.organismModel;
    if ( !organism.userControlled ) {
      this.animateMovementStep( organismStateMachine, dt );
    }
  },

  onAnimateMoveEnd: function( organismStateMachine ) {
    var organism = organismStateMachine.organismModel;
    var preyBeingEaten = organism.organismBeingEaten;
    preyBeingEaten.startDying();
    organism.finishEating();
  },

  entered: function( organismStateMachine ) {

  },

  exit: function() {

  }

} );

module.exports = PredatingState;
