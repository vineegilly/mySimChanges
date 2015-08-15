var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );
var OrganismImageCollection = require( './OrganismImageCollection' );

/**
 *
 * @param {string} type // ex carniovores
 * @param {imageNode} icon // a carnivores can be represented by different icons
 * @param {Vector2} pos // initial Position
 * @constructor
 */
function CarnivoresModel( type, icon, pos ) {
   BaseOrganismModel.call( this, type, icon, pos );
}

inherit( BaseOrganismModel, CarnivoresModel, {} );

module.exports = CarnivoresModel;