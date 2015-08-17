var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );
var OrganismImageCollection = require( './OrganismImageCollection' );
var HerbivoresStateMachine = require('../states/HerbivoresStateMachine');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {string} type // ex carniovores
 * @param {imageNode} icon // a carnivores can be represented by different icons
 * @param {Vector2} pos // initial Position
 * @constructor
 */
function HerbivoresModel( ecoSystemModel,type, icon, pos ) {
  BaseOrganismModel.call( this, ecoSystemModel,type, icon, pos );
}

inherit( BaseOrganismModel, HerbivoresModel, {
  createStateMachine: function() {
    return  new HerbivoresStateMachine(this);
  }
} );

module.exports = HerbivoresModel;