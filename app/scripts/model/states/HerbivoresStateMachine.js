var inherit = axon.inherit;
var OrganismStateMachine = require('./OrganismStateMachine');
var DecomposerStateMachine = require('../states/DecomposerStateMachine');

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
