var inherit = axon.inherit;

// constants
var beetle = require( "../../../assets/images/beetle.png" );
var grass = require( "../../../assets/images/grass.png" );
var earthworm = require( "../../../assets/images/earthworm.png" );
var flower = require( "../../../assets/images/flower.png" );
var hawk = require( "../../../assets/images/hawk.png" );
var mushroom = require( "../../../assets/images/mushroom.png" );
var snake = require( "../../../assets/images/snake.png" );
var tree = require( "../../../assets/images/tree.png" );
var mouse = require( "../../../assets/images/mouse.png" );
var butterfly = require( "../../../assets/images/butterfly.png" );
var raccoon = require( "../../../assets/images/raccoon.png" );
var deer = require( "../../../assets/images/deer.png" );
var rabbit = require( "../../../assets/images/rabbit.png" );
var cayote = require( "../../../assets/images/cayote.png" );
var frog = require( "../../../assets/images/frog.png" );
var songbird = require( "../../../assets/images/bird.png" );


var organismIdImageMap = {
  beetle: beetle,
  grass: grass,
  earthworm: earthworm,
  flower: flower,
  hawk: hawk,
  mushroom: mushroom,
  snake: snake,
  tree: tree,
  mouse: mouse,
  butterfly: butterfly,
  raccoon: raccoon,
  deer: deer,
  rabbit: rabbit,
  cayote: cayote,
  frog: frog,
  songbird: songbird
};


function OrganismImageCollection() {


}

inherit( Object, OrganismImageCollection, {},
  //statics
  {

    /**
     *
     * @param name
     * @returns {Image}
     */
    getRepresentation: function( name ) {
      return organismIdImageMap[ name ];
    }
  } );

module.exports = OrganismImageCollection;

