var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );
var Vector2 = dot.Vector2;

function ReturnToOriginState() {

}

inherit( BaseOrganismState, ReturnToOriginState, {

  step: function( organismStateMachine, dt ) {
    var organism = organismStateMachine.organismModel;
    if ( !organism.userControlled ) {

      // perform any animation
      var distanceToDestination = organism.position.distance( organism.destination );
      if ( distanceToDestination > dt * organism.velocity ) {
        // Move a step toward the destination.
        var stepAngle = Math.atan2( organism.destination.y - organism.position.y, organism.destination.x - organism.position.x );
        var stepVector = Vector2.createPolar( organism.velocity * dt, stepAngle );
        organism.position = organism.position.plus( stepVector );

      }
      else if ( organism.animating ) {
        // Less than one time step away, so just go to the destination.
        organism.position = organism.destination;
        organism.animating = false;
        organismStateMachine.goToRest();
      }

    }
  },

  entered: function( organismStateMachine ) {

  },

  exit: function() {

  }

} );


module.exports = ReturnToOriginState;
