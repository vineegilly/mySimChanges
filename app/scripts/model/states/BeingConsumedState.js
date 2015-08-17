var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );

/**
 *
 * @constructor
 */
function BeingConsumedState() {
  BaseOrganismState.call(this);

}


inherit( BaseOrganismState, BeingConsumedState, {} );

module.exports = BeingConsumedState;
