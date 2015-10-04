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
function BaseCarnivoresModel( ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction ) {
  BaseOrganismModel.call( this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction );

  this.timeElapsedWithoutProducer = 0; // in milliseconds
  this.timeElapsedSinceReproduction = 0;
}

inherit( BaseOrganismModel, BaseCarnivoresModel, {

  /**
   * @override
   * @param dt
   */
  doStep: function( dt ) {
    this.timeElapsedWithoutProducer += dt;
    this.timeElapsedSinceReproduction += dt;

    if ( this.timeElapsedWithoutProducer >= this.getTimeThresholdForLackOfProducer() ) {
      this.moveToDyingStateBecauseOfNoProducer();
    }


  },

  moveToDyingStateBecauseOfNoProducer: function() {

  },

  moveToReproductionState: function() {

  },


  getTimeThresholdForLackOfProducer: function() {

  },


  initState: function() {
    this.goToRest();
  }


} );

module.exports = BaseCarnivoresModel;