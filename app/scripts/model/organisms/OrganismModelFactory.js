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
    getOrganism: function( type, appearanceImage, pos ) {

      switch( type ) {
        case OrganismImageCollection.CARNIVORES:
          return new CarnivoresModel( type, appearanceImage, pos );
        case OrganismImageCollection.OMNIVORES:
          return new OmnivoresModel( type, appearanceImage, pos );
        case OrganismImageCollection.PRODUCERS:
          return new ProducerModel( type, appearanceImage, pos );
        case OrganismImageCollection.HERBIVORES:
          return new HerbivoresModel( type, appearanceImage, pos );
        case OrganismImageCollection.DECOMPOSERS:
          return new DecomposerModel( type, appearanceImage, pos );

      }
    }
  } );

module.exports = OrganismModelFactory;