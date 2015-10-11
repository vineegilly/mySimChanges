/**
 * Model common for Grass,Flower and Tree
 * Rain is the "food" . In addition this can be exposed to Pesticide
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
  this.timeElapsedSincePoision = 0; // pesticide or herbicide
}

inherit( BaseOrganismModel, BaseProducerModel, {

  /**
   * @override
   * @param dt
   */
  doStep: function( dt ) {


  },

  validateExpiryState: function( dt ) {
    BaseOrganismModel.prototype.validateExpiryState.call( this, dt );
    this.timeElapsedSincePoision += dt;

    if ( this.timeElapsedSincePoision >= this.getTimeThresholdForPoison() ) {
      this.moveToDyingStateDueToPoison();
    }

  },

  getTimeThresholdForPoison: function() {

  },

  moveToDyingStateDueToPoison: function() {

  },

  incrementTimeElapsedWithoutFood: function( dt ) {
    if(this.ecoSystemModel.isRaining()){
      return;
    }

    this.timeElapsedWithoutFood += dt * 1000; // in milliseconds
  },

  initState: function() {
    this.goToRest();
  },

  /**
   * Flower,grass and Tree dont Move and interact, so override play
   */
  play: function() {

  },

  onRain:function(){
    this.timeElapsedWithoutFood =0;
  }

} );

module.exports = BaseProducerModel;