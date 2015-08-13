var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );

function CarnivoresModel() {
  BaseOrganismModel.call( this, {} );
}

inherit( BaseOrganismModel, CarnivoresModel, {} );

