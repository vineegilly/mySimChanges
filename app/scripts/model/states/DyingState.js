var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );
var Vector2 = dot.Vector2;

function DyingState() {
  BaseOrganismState.call( this );
}

inherit( BaseOrganismState, DyingState, {

  step: function( organismStateMachine, dt ) {
    var organism = organismStateMachine.organismModel;
    var particles = organism.particles;
    // check if scale is less or equal to zero, it means the particle effect
    // is over and we can move the organism to death state
    var isAllDead = _.every( particles, function( particle ) {
      return !particle.isLive();
    } );

    if ( isAllDead ) {
      organism.die();
    }

    organism.opacity = Math.max( 0, Math.min( organism.opacity - 0.05, 1 ) );

  },


  entered: function( organismStateMachine ) {

  },

  exit: function() {

  }

} );


module.exports = DyingState;
