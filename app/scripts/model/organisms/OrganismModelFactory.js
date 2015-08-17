var inherit = axon.inherit;
var OrganismImageCollection = require( './OrganismImageCollection' );
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
     * @param {Image} appearanceImage
     * @param {Vector2} pos
     * @returns {*}
     */
    getOrganism: function( ecoSystemModel,type, appearanceImage, pos ) {

      switch( type ) {
        case OrganismImageCollection.CARNIVORES:
          return new CarnivoresModel( ecoSystemModel,type, appearanceImage, pos );
        case OrganismImageCollection.OMNIVORES:
          return new OmnivoresModel( ecoSystemModel,type, appearanceImage, pos );
        case OrganismImageCollection.PRODUCERS:
          return new ProducerModel( ecoSystemModel,type, appearanceImage, pos );
        case OrganismImageCollection.HERBIVORES:
          return new HerbivoresModel( ecoSystemModel,type, appearanceImage, pos );
        case OrganismImageCollection.DECOMPOSERS:
          return new DecomposerModel( ecoSystemModel,type, appearanceImage, pos );

      }
    }
  } );

module.exports = OrganismModelFactory;