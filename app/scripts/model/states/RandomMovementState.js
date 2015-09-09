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
     if ( ecoSystemModel.isPlaying() ) {
      this.animateMovementStep( organismStateMachine, dt );
    }
  },

  onAnimateMoveEnd: function( organismStateMachine ) {
    var organism = organismStateMachine.organismModel;
    organism.nextRandomMovement();
  },

  entered: function( organismStateMachine, dt ) {
    organismStateMachine.organismModel.nextRandomMovement();
  },

  exit: function() {

  }


} )
;


module.exports = RandomMovementState;