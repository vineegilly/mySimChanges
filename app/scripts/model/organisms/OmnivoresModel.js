var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );



/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function OmnivoresModel(ecoSystemModel, organismInfo, initialPosition,bounds ) {
  BaseOrganismModel.call( this, ecoSystemModel, organismInfo, initialPosition,bounds );
}

inherit( BaseOrganismModel, OmnivoresModel, {
  clone:function(initialPos){
    return new OmnivoresModel(this.ecoSystemModel,this.organismInfo,initialPos,this.motionBounds);
  }
} );

module.exports = OmnivoresModel;