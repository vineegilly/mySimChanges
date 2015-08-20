var inherit = axon.inherit;
var EcoSystemConstants = require( '../EcoSystemConstants' );
var CarnivoresModel = require( './CarnivoresModel' );
var ConsumerModel = require( './ConsumerModel' );
var DecomposerModel = require( './DecomposerModel' );
var HerbivoresModel = require( './HerbivoresModel' );
var OmnivoresModel = require( './OmnivoresModel' );
var ProducerModel = require( './ProducerModel' );


function OrganismModelFactory() {


}


inherit( Object, OrganismModelFactory, {},
  // statics
  {
    /**
     *
     * @param {string} type
     * @param {Image} organismInfo
     * @param {Vector2} pos
     * @returns {*}
     */
    getOrganism: function( ecoSystemModel, organismInfo, pos, bounds ) {

      var type = organismInfo.type;
      switch( type ) {
        case EcoSystemConstants.CARNIVORES:
          return new CarnivoresModel( ecoSystemModel, organismInfo, pos, bounds );
        case EcoSystemConstants.OMNIVORES:
          return new OmnivoresModel( ecoSystemModel, organismInfo, pos, bounds );
        case EcoSystemConstants.PRODUCERS:
          return new ProducerModel( ecoSystemModel, organismInfo, pos, bounds );
        case EcoSystemConstants.HERBIVORES:
          return new HerbivoresModel( ecoSystemModel, organismInfo, pos, bounds );
        case EcoSystemConstants.DECOMPOSERS:
          return new DecomposerModel( ecoSystemModel, organismInfo, pos, bounds );

      }
    }
  } );

module.exports = OrganismModelFactory;