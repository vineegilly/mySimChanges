var inherit = axon.inherit;
var OrganismStateMachine = require('./OrganismStateMachine');

/**
 *
 * @param {OrganismModel} organismModel
 * @constructor
 */
function OmnivoresStateMachine(organismModel){
  OrganismStateMachine.call(this,organismModel);
  this.setState( OrganismStateMachine.organismRestingStateInstance );
}

inherit(OrganismStateMachine,OmnivoresStateMachine,{

});

module.exports = OmnivoresStateMachine;
