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
function BaseDecomposerModel( ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction ) {
  BaseOrganismModel.call( this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction );

  this.timeElapsedWithoutProducer = 0; // in milliseconds
  this.timeElapsedSinceReproduction = 0;
}

inherit( BaseOrganismModel, BaseDecomposerModel, {

  /**
   * @override
   * @param dt
   */
  doStep: function( dt ) {
    this.timeElapsedWithoutProducer += dt;
    this.timeElapsedSinceReproduction += dt;

    if ( this.timeElapsedWithoutProducer >= this.getTimeThresholdForProducer() ) {
      this.moveToDyingStateBecauseOfNoProducer();
    }

    if ( this.timeElapsedSinceReproduction >= this.getTimeThresholdForReproduction() ) {
      this.moveToReproductionState();
    }


  },

  moveToDyingStateBecauseOfNoProducer: function() {

  },


  moveToReproductionState: function() {

  },


  getTimeThresholdForProducer: function() {
    throw new Error( "getTimeThresholdForRain must be implemented in  BaseOrganismModel's descendant class" );
  },

  getTimeThresholdForReproduction: function() {
    throw new Error( "getTimeThresholdForReproduction must be implemented in  BaseOrganismModel's descendant class" );
  },


  initState: function() {
    this.goToRest();
  },

  /**
   * Flower,grass and Tree dont Move and interact, so override play
   */
  play: function() {

  }


} );

module.exports = BaseCarnivoresModel;