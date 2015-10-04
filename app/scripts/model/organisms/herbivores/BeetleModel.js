var inherit = axon.inherit;
var BaseHerbivoresModel = require( './BaseHerbivoresModel' );
var OrganismTimeActionConstants = require( '../../../model/OrganismTimeActionConstants' );

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function BeetleModel( ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction ) {
  BaseHerbivoresModel.call( this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction );

  this.timeElapsedExposedToPesticide = 0;
}

inherit( BaseHerbivoresModel, BeetleModel, {

  clone: function( initialPos, createdThroughInteraction ) {
    return new BeetleModel( this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds, createdThroughInteraction );
  },

  doStep: function( dt ) {
    BaseHerbivoresModel.prototype.doStep.call( this, dt );

    this.timeElapsedExposedToPesticide += dt;

    if ( this.timeElapsedExposedToPesticide >= this.getTimeThresholdExposedToPesticide() ) {
      this.moveToDyingState();
    }
  },

  /**
   * Time it can live without a prey
   * @returns {OrganismTimeActionConstants.BEETLE_DIE_NO_PREY|*}
   */
  getTimeThresholdForProducer: function() {
    return OrganismTimeActionConstants.BEETLE_DIE_NO_PREY;
  },

  getTimeThresholdExposedToPesticide: function() {
    return OrganismTimeActionConstants.BEETLE_DIE_INSECTICIDE;
  },

  getTimeThresholdForReproduction: function() {
    throw new Error( "getTimeThresholdForReproduction must be implemented in  BaseHerbivoresModel's descendant class" );
  }


} );

module.exports = BeetleModel;