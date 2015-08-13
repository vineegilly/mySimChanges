var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );

function ProducerModel() {
  BaseOrganismModel.call( this, {} );
}

inherit( BaseOrganismModel, ProducerModel, {} );

