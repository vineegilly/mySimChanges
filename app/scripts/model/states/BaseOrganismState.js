var inherit = axon.inherit;
var Vector2 = dot.Vector2;

function BaseOrganismState() {

}


inherit( Object, BaseOrganismState, {

  animateStep: function( organismStateMachine, dt ) {
    var ecoSystemModel = organismStateMachine.organismModel.ecoSystemModel;
    var organism = organismStateMachine.organismModel;
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
      this.onAnimateMoveEnd(organismStateMachine);
    }
  },

  onAnimateMoveEnd: function( organismStateMachine ) {

  },


  step: function( organismStateMachine, dt ) {

  },

  entered: function( organismStateMachine ) {

  },

  exit: function() {

  }

} );


module.exports = BaseOrganismState;