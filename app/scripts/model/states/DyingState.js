var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );
var Vector2 = dot.Vector2;

function DyingState() {
  BaseOrganismState.call( this );
}

inherit( BaseOrganismState, DyingState, {

  step: function( organismStateMachine, dt ) {
    var organism = organismStateMachine.organismModel;
    organism.opacity = Math.max( 0, Math.min( organism.opacity - 0.05, 1 ) );
    if ( organism.opacity <= 0 ) {
      organism.die();
    }
  },


  entered: function( organismStateMachine ) {

  },

  exit: function() {

  }

} );


module.exports = DyingState;
