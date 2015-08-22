var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );
var Vector2 = dot.Vector2;
var EcoSystemConstants = require( '../../model/EcoSystemConstants' );

function ReproducingState() {
  BaseOrganismState.call( this );
}

inherit( BaseOrganismState, ReproducingState, {

  step: function( organismStateMachine, dt ) {
    var organism = organismStateMachine.organismModel;
    if ( !organism.userControlled ) {
      this.animateMovementStep( organismStateMachine, dt );
    }
  },

  onAnimateMoveEnd: function( organismStateMachine ) {

    var organism = organismStateMachine.organismModel;
    var organismReproducingWith = organism.organismReproducingWith;
    organism.reproduceWith( organismReproducingWith );

    organismReproducingWith.finishReproducing();
    organism.finishReproducing();
  },

  entered: function( organismStateMachine ) {

  },

  exit: function() {

  }

} );

module.exports = ReproducingState;
