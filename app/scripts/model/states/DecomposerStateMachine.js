var inherit = axon.inherit;
var OrganismStateMachine = require( './OrganismStateMachine' );

/**
 *
 * @param {OrganismModel} organismModel
 * @constructor
 */
function DecomposerStateMachine( organismModel ) {
  OrganismStateMachine.call( this, organismModel );
  this.setState( OrganismStateMachine.organismRestingStateInstance );
}

inherit( OrganismStateMachine, DecomposerStateMachine, {} );

module.exports = DecomposerStateMachine;
