/**
 * Model common for Grass,Flower and Tree
 */
var inherit = axon.inherit;
var BaseOrganismModel = require( '../BaseOrganismModel' );

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function BaseHerbivoresModel( ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction ) {
  BaseOrganismModel.call( this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction );

  this.timeElapsedWithoutProducer = 0; // in milliseconds
  this.timeElapsedSinceReproduction = 0;
}

inherit( BaseOrganismModel, BaseHerbivoresModel, {

  /**
   * @override
   * @param dt
   */
  doStep: function( dt ) {
    this.timeElapsedWithoutProducer += dt;
    this.timeElapsedSinceReproduction += dt;

    if ( this.timeElapsedWithoutProducer >= this.getTimeThresholdForProducer() ) {
      this.moveToDyingState();
    }

  },

  /**
   * This could be because there is no prey to eat or exposed to pesticide
   */
  moveToDyingState: function() {

  },


  moveToReproductionState: function() {

  },

  /**
   * Time it can live without a prey
   * @returns {OrganismTimeActionConstants.BEETLE_DIE_NO_PREY|*}
   */
  getTimeThresholdForProducer: function() {
    throw new Error( "getTimeThresholdForRain must be implemented in  BaseHerbivoresModel's descendant class" );
  },

  /**
   * Time it has to wait for reproduction
   * @returns {OrganismTimeActionConstants.BEETLE_DIE_NO_PREY|*}
   */
  getTimeThresholdForReproduction: function() {
    throw new Error( "getTimeThresholdForReproduction must be implemented in  BaseHerbivoresModel's descendant class" );
  },


  initState: function() {
    this.goToRest();
  }


} );

module.exports = BaseHerbivoresModel;