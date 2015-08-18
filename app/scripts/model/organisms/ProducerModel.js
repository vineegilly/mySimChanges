var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );
var OrganismImageCollection = require( './OrganismImageCollection' );
var ProducerStateMachine = require( '../states/ProducerStateMachine' );

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {string} type // ex carniovores
 * @param {imageNode} icon // a carnivores can be represented by different icons
 * @param {Vector2} pos // initial Position
 * @param {Bounds2} bounds
 * @constructor
 */
function ProducerModel( ecoSystemModel, type, icon, pos, bounds ) {
  BaseOrganismModel.call( this, ecoSystemModel, type, icon, pos, bounds );
}

inherit( BaseOrganismModel, ProducerModel, {
  createStateMachine: function() {
    return new ProducerStateMachine( this );
  }
} );

module.exports = ProducerModel;