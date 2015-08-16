var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );


function RandomMovementState() {

}

inherit( BaseOrganismState, RandomMovementState, {

  step: function( organismStateMachine, dt ) {

  },

  entered: function( organismStateMachine, dt ) {

  },

  exit: function() {

  }


} );


module.exports = RandomMovementState;