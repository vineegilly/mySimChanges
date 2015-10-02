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
function BaseProducerModel( ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction ) {
  BaseOrganismModel.call( this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction );

  this.timeElapsedSinceRain = 0; // in milliseconds
  this.timeElapsedSinceHeribicide = 0;
  this.timeElapsedSinceReproduction = 0;
}

inherit( BaseOrganismModel, BaseProducerModel, {

  /**
   * @override
   * @param dt
   */
  doStep: function( dt ) {
    this.timeElapsedSinceRain += dt;
    this.timeElapsedSinceHeribicide += dt;
    this.timeElapsedSinceReproduction += dt;

    if ( this.timeElapsedSinceRain >= this.getTimeThresholdForRain() ) {
      this.moveToDyingStateDueToRain();
    }

    if ( this.timeElapsedSinceHeribicide >= this.getTimeThresholdForHerbicide() ) {
      this.moveToDyingStateDueToHerbicide();
    }

    if ( this.timeElapsedSinceReproduction >= this.getTimeThresholdForReproduction() ) {
      this.moveToReproductionState();
    }
  },

  moveToDyingStateDueToRain: function() {

  },

  moveToDyingStateDueToHerbicide: function() {

  },

  moveToReproductionState: function() {

  },


  getTimeThresholdForRain: function() {
    throw new Error( "getTimeThresholdForRain must be implemented in  BaseOrganismModel's descendant class" );
  },

  getTimeThresholdForHerbicide: function() {
    throw new Error( "getTimeThresholdForHerbicide must be implemented in  BaseOrganismModel's descendant class" );
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

module.exports = BaseProducerModel;