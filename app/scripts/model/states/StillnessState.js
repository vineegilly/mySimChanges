var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );


function StillnessState() {

}

inherit( BaseOrganismState, StillnessState, {

  step: function( organismStateMachine, dt ) {

  },

  entered: function( organismStateMachine, dt ) {

  },

  exit: function() {

  }


} );


module.exports = StillnessState;