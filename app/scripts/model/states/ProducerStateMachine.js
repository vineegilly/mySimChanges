var inherit = axon.inherit;
var OrganismStateMachine = require('./OrganismStateMachine');

/**
 *
 * @param {OrganismModel} organismModel
 * @constructor
 */
function ProducerStateMachine(organismModel){
  OrganismStateMachine.call(this,organismModel);
  this.setState( OrganismStateMachine.organismRestingStateInstance );
}

inherit(OrganismStateMachine,ProducerStateMachine,{

});

module.exports = ProducerStateMachine;
