var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );

function OmnivoresModel() {
  BaseOrganismModel.call( this, {} );
}

inherit( BaseOrganismModel, OmnivoresModel, {} );

