var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function CarnivoresModel( ecoSystemModel, organismInfo, initialPosition,bounds ) {
  BaseOrganismModel.call( this, ecoSystemModel, organismInfo, initialPosition,bounds );
}

inherit( BaseOrganismModel, CarnivoresModel, {

  clone:function(initialPos){
    return new CarnivoresModel(this.ecoSystemModel,this.organismInfo,initialPos,this.motionBounds);
  }

} );

module.exports = CarnivoresModel;