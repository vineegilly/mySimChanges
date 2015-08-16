var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );

function OrganismRestingState() {

}

inherit( BaseOrganismState, OrganismRestingState, {

  /** Do nothing **/

  step: function( organismStateMachine, dt ) {

  },

  entered: function( organismStateMachine ) {

  },

  exit: function() {

  }

} );


module.exports = OrganismRestingState;
