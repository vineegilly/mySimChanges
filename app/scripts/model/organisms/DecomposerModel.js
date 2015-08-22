var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );



/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function DecomposerModel( ecoSystemModel, organismInfo, initialPosition,bounds ) {
  BaseOrganismModel.call( this, ecoSystemModel, organismInfo, initialPosition,bounds );
}

inherit( BaseOrganismModel, DecomposerModel, {
  nextRandomMovement: function() {
    this.setDestination( this.position );
  },

  clone:function(initialPos){
    return new DecomposerModel(this.ecoSystemModel,this.organismInfo,initialPos,this.motionBounds);
  }
} );

module.exports = DecomposerModel;