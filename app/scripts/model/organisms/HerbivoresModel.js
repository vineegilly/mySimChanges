var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );

function HerbivoresModel() {
  BaseOrganismModel.call( this, {} );
}

inherit( BaseOrganismModel, HerbivoresModel, {} );

