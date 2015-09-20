var inherit = axon.inherit;

// constants
var lion = require( "../../../assets/images/lion.png" );
var beetle = require( "../../../assets/images/beetle.png" );
var cow = require( "../../../assets/images/cow.png" );
var chicken = require( "../../../assets/images/chicken.png" );
var grass = require( "../../../assets/images/grass.png" );
var earthworm = require( "../../../assets/images/earthworm.png" );
var flower = require( "../../../assets/images/flower.png" );
var hawk = require( "../../../assets/images/hawk.png" );
var mushroom = require( "../../../assets/images/mushroom.png" );
var snake = require( "../../../assets/images/snake.png" );
var squirrel = require( "../../../assets/images/squirrel.png" );
var tree = require( "../../../assets/images/tree.png" );
var virus = require( "../../../assets/images/virus.png" );


var organismIdImageMap = {
  1000: lion,
  2000: beetle,
  3000: cow,
  4000: chicken,
  5000: grass,
  6000: earthworm,
  7000: flower,
  8000: hawk,
  9000: mushroom,
  9001: snake,
  9002: squirrel,
  9003: tree,
  9004: virus
};


function OrganismImageCollection() {


}

inherit( Object, OrganismImageCollection, {},
  //statics
  {

    /**
     *
     * @param type
     * @returns {Image}
     */
    getRepresentation: function( id ) {
      return organismIdImageMap[ id ];
    }
  } );

module.exports = OrganismImageCollection;

