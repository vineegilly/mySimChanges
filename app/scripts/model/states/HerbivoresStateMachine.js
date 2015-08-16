var inherit = axon.inherit;
var OrganismStateMachine = require('./OrganismStateMachine');

/**
 *
 * @param {OrganismModel} organismModel
 * @constructor
 */
function HerbivoresStateMachine(organismModel){
  OrganismStateMachine.call(this,organismModel);
  this.setState( OrganismStateMachine.organismRestingStateInstance );
}

inherit(OrganismStateMachine,HerbivoresStateMachine,{

});

module.exports = HerbivoresStateMachine;
