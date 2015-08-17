var inherit = axon.inherit;
var OrganismStateMachine = require( './OrganismStateMachine' );


/**
 *
 * @param {OrganismModel} organismModel
 * @constructor
 */
function ConsumerStateMachine( organismModel ) {
  OrganismStateMachine.call( this, organismModel );
  this.setState( OrganismStateMachine.organismRestingStateInstance );
}

inherit( OrganismStateMachine, ConsumerStateMachine, {} );

module.exports = ConsumerStateMachine;
