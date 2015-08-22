var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );



/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function ConsumerModel( ecoSystemModel, organismInfo, initialPosition,bounds ) {
  BaseOrganismModel.call( this, ecoSystemModel, organismInfo, initialPosition,bounds );

}

inherit( BaseOrganismModel, ConsumerModel, {
  clone:function(initialPos){
    return new ConsumerModel(this.ecoSystemModel,this.organismInfo,initialPos,this.motionBounds);
  }
} );

module.exports = ConsumerModel;