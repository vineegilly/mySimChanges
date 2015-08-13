var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );

function DecomposerModel() {
  BaseOrganismModel.call( this, {} );
}

inherit( BaseOrganismModel, DecomposerModel, {} );

