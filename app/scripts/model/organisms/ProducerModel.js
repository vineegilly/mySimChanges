var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function ProducerModel( ecoSystemModel, organismInfo, initialPosition, bounds ) {
  BaseOrganismModel.call( this, ecoSystemModel, organismInfo, initialPosition, bounds );
}

inherit( BaseOrganismModel, ProducerModel, {
  nextRandomMovement: function() {
    this.setDestination( this.position );
  },

  clone: function( initialPos ) {
    return new ProducerModel( this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds );
  }
} );

module.exports = ProducerModel;