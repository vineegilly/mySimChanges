var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );
var Vector2 = dot.Vector2;

function ReturnToOriginState() {
  BaseOrganismState.call( this );
}

inherit( BaseOrganismState, ReturnToOriginState, {

  step: function( organismStateMachine, dt ) {
    var organism = organismStateMachine.organismModel;
    if ( !organism.userControlled ) {
      this.animateStep( organismStateMachine, dt );
    }
    else if ( organism.animating ) {
      // Less than one time step away, so just go to the destination.
      organism.position = organism.destination;
      organism.animating = false;
      organismStateMachine.goToRest();
    }

  },

  entered: function( organismStateMachine ) {

  },

  exit: function() {

  }

} );


module.exports = ReturnToOriginState;
