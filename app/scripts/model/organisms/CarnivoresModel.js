var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );
var OrganismImageCollection = require( './OrganismImageCollection' );
var CarnivoresStateMachine = require('../states/CarnivoresStateMachine');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {string} type // ex carniovores
 * @param {imageNode} icon // a carnivores can be represented by different icons
 * @param {Vector2} pos // initial Position
 * @constructor
 */
function CarnivoresModel( ecoSystemModel,type, icon, pos ) {
   BaseOrganismModel.call( this,ecoSystemModel, type, icon, pos );
}

inherit( BaseOrganismModel, CarnivoresModel, {

   createStateMachine: function() {
     return new CarnivoresStateMachine(this);
   }

} );

module.exports = CarnivoresModel;