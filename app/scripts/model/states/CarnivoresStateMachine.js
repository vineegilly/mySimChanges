var inherit = axon.inherit;
var OrganismStateMachine = require( './OrganismStateMachine' );


/**
 *
 * @param {OrganismModel} organismModel
 * @constructor
 */
function CarnivoresStateMachine( organismModel ) {
  OrganismStateMachine.call( this, organismModel );
  this.setState( OrganismStateMachine.organismRestingStateInstance );
}

inherit( OrganismStateMachine, CarnivoresStateMachine, {} );

module.exports = CarnivoresStateMachine;
