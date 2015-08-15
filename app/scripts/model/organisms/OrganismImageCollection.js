var inherit = axon.inherit;

// constants
var CARNIVORES_IMAGE = require( "../../../assets/images/carnivores.png" );
var DECOMPOSERS_IMAGE = require( "../../../assets/images/decomposers.png" );
var HERBIVORES_IMAGE = require( "../../../assets/images/herbivores.png" );
var OMNIVORES_IMAGE = require( "../../../assets/images/omnivores.png" );
var PRODUCERS_IMAGE = require( "../../../assets/images/producers.png" );

// type constants
var CARNIVORES = "CARNIVORES";
var DECOMPOSERS = "DECOMPOSERS";
var HERBIVORES = "HERBIVORES";
var OMNIVORES = "OMNIVORES";
var PRODUCERS = "PRODUCERS";

var imageTypeColllection = {
  CARNIVORES: CARNIVORES_IMAGE,
  DECOMPOSERS: DECOMPOSERS_IMAGE,
  HERBIVORES: HERBIVORES_IMAGE,
  OMNIVORES: OMNIVORES_IMAGE,
  PRODUCERS: PRODUCERS_IMAGE
};

function OrganismImageCollection() {


}

inherit( Object, OrganismImageCollection, {},
  //statics
  {
    CARNIVORES: CARNIVORES,
    DECOMPOSERS: DECOMPOSERS,
    HERBIVORES: HERBIVORES,
    OMNIVORES: OMNIVORES,
    PRODUCERS: PRODUCERS,

    /**
     *
     * @param type
     * @returns {Image}
     */
    getRepresentation: function( type ) {
      return imageTypeColllection[ type ];
    }
  } );

module.exports = OrganismImageCollection;

