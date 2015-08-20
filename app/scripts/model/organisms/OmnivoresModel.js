var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );
var OrganismImageCollection = require( './OrganismImageCollection' );
var OmnivoresStateMachine = require('../states/OmnivoresStateMachine');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {string} type // ex carniovores
 * @param {imageNode} icon // a carnivores can be represented by different icons
 * @param {Vector2} pos // initial Position
 * @param {Bounds2} bounds
 * @constructor
 */
function OmnivoresModel( ecoSystemModel,type, icon, pos,bounds ) {
  BaseOrganismModel.call( this, ecoSystemModel,type, icon, pos,bounds );
}

inherit( BaseOrganismModel, OmnivoresModel, {
  createStateMachine: function() {
    return new OmnivoresStateMachine(this);
  }

} );

module.exports = OmnivoresModel;