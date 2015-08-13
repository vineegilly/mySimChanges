var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );

function ConsumerModel() {
  BaseOrganismModel.call( this, {} );
}

inherit( BaseOrganismModel, ConsumerModel, {} );

