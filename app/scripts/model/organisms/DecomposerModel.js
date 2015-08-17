var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );
var OrganismImageCollection = require( './OrganismImageCollection' );
var DecomposerStateMachine = require('../states/DecomposerStateMachine');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {string} type // ex carniovores
 * @param {imageNode} icon // a carnivores can be represented by different icons
 * @param {Vector2} pos // initial Position
 * @constructor
 */
function DecomposerModel( ecoSystemModel,type, icon, pos ) {
  BaseOrganismModel.call( this, ecoSystemModel,type, icon, pos );
}

inherit( BaseOrganismModel, DecomposerModel, {
  createStateMachine: function() {
    return  new DecomposerStateMachine(this);
  }
} );

module.exports = DecomposerModel;