var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );
var Vector2 = dot.Vector2;


function RandomMovementState() {
  BaseOrganismState.call( this );
}

inherit( BaseOrganismState, RandomMovementState, {

  /**
   *
   * @param {OrganismStateMachine} organismStateMachine
   * @param {number} dt
   */
  step: function( organismStateMachine, dt ) {
    var ecoSystemModel = organismStateMachine.organismModel.ecoSystemModel;
    var organism = organismStateMachine.organismModel;
    if ( ecoSystemModel.isPlaying() ) {
      this.animateStep( organismStateMachine, dt );
    }
    else if ( organism.animating ) {
      // Less than one time step away, so just go to the destination.
      organism.position = organism.destination;
    }

  },

  onAnimateMoveEnd: function( organismStateMachine ) {
    var organism = organismStateMachine.organismModel;
    organism.nextRandomMovement();
  },

  entered: function( organismStateMachine, dt ) {
    organismStateMachine.organismModel.nextRandomMovement();
  }
  ,

  exit: function() {

  }


} )
;


module.exports = RandomMovementState;