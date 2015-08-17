var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );
var OrganismImageCollection = require( './OrganismImageCollection' );
var ProducerStateMachine = require( '../states/ProducerStateMachine' );

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {string} type // ex carniovores
 * @param {imageNode} icon // a carnivores can be represented by different icons
 * @param {Vector2} pos // initial Position
 * @constructor
 */
function ProducerModel( ecoSystemModel, type, icon, pos ) {
  BaseOrganismModel.call( this, ecoSystemModel, type, icon, pos );
}

inherit( BaseOrganismModel, ProducerModel, {
  createStateMachine: function() {
    return new ProducerStateMachine( this );
  }
} );

module.exports = ProducerModel;