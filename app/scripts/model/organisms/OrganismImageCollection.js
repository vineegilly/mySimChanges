var inherit = axon.inherit;

// constants
var lion = require( "../../../assets/images/lion.png" );
var fungi = require( "../../../assets/images/fungi.png" );
var cow = require( "../../../assets/images/cow.png" );
var chicken = require( "../../../assets/images/chicken.png" );
var grass = require( "../../../assets/images/grass.png" );

var organismIdImageMap ={
  1000:lion,
  2000:fungi,
  3000:cow,
  4000:chicken,
  5000:grass
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

