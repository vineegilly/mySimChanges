var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );
var OrganismImageCollection = require( './OrganismImageCollection' );
var OmnivoresStateMachine = require('../states/OmnivoresStateMachine');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {string} type // ex carniovores
 * @param {imageNode} icon // a carnivores can be represented by different icons
 * @param {Vector2} pos // initial Position
 * @constructor
 */
function OmnivoresModel( ecoSystemModel,type, icon, pos ) {
  BaseOrganismModel.call( this, ecoSystemModel,type, icon, pos );
}

inherit( BaseOrganismModel, OmnivoresModel, {
  createStateMachine: function() {
    return new OmnivoresStateMachine(this);
  }
} );

module.exports = OmnivoresModel;