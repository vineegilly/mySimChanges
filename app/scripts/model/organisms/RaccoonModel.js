var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function RaccoonModel( ecoSystemModel, organismInfo, initialPosition,bounds,createdThroughInteraction ) {
  BaseOrganismModel.call( this, ecoSystemModel, organismInfo, initialPosition,bounds,createdThroughInteraction );
}

inherit( BaseOrganismModel, RaccoonModel, {

  clone:function(initialPos,createdThroughInteraction){
    return new RaccoonModel(this.ecoSystemModel,this.organismInfo,initialPos,this.motionBounds,createdThroughInteraction);
  }

} );

module.exports = RaccoonModel;