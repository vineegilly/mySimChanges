/**
 * The main model containing - EcoSystem
 * @author Sharfudeen Ashraf
 *
 */

// modules
var inherit = axon.inherit;
var PropertySet = axon.PropertySet;
var ObservableArray = axon.ObservableArray;
var OrganismImageCollection = require( '../model/organisms/OrganismImageCollection' );

//constants
var PLAY_STATE = 1;
var PAUSED_STATE = 2;
var STOPPED_STATE = 3;

function EcoSystemModel( screenBounds ) {
  PropertySet.call( this, {
    playState: PAUSED_STATE
  } );
  this.screenBounds = screenBounds;

  // Observable array of the organisms that have been placed on grid
  this.residentOrganismModels = new ObservableArray();

  this.selectedOrganisms = [
    { type: OrganismImageCollection.CARNIVORES, appearanceImage: OrganismImageCollection.getRepresentation( OrganismImageCollection.CARNIVORES ) },
    { type: OrganismImageCollection.HERBIVORES, appearanceImage: OrganismImageCollection.getRepresentation( OrganismImageCollection.HERBIVORES ) },
    { type: OrganismImageCollection.PRODUCERS, appearanceImage: OrganismImageCollection.getRepresentation( OrganismImageCollection.PRODUCERS ) },
    { type: OrganismImageCollection.DECOMPOSERS, appearanceImage: OrganismImageCollection.getRepresentation( OrganismImageCollection.DECOMPOSERS ) },
    { type: OrganismImageCollection.OMNIVORES, appearanceImage: OrganismImageCollection.getRepresentation( OrganismImageCollection.OMNIVORES ) },
  ];


}


inherit( PropertySet, EcoSystemModel, {
  /**
   * model related animation
   * @param dt
   */
  step: function( dt ) {
    this.residentOrganismModels.forEach( function( organismModel ) {
      organismModel.step( dt );
    } );
  },

  /**
   *
   * @param {OrganismModel} organismModel
   */
  addOrganism: function( organismModel ) {
    var self = this;
    this.residentOrganismModels.add( organismModel );

    organismModel.on( 'returnedToOrigin', function() {
      if ( !organismModel.userControlled ) {
        // The shape has been returned to the panel.
        self.residentOrganismModels.remove( organismModel );
      }
    } );
  },

  isPlaying: function() {
    return this.playState === PLAY_STATE;
  },

  play:function(){
    this.residentOrganismModels.forEach( function( organismModel ) {
      organismModel.play(  );
    } );
  }

} );

module.exports = EcoSystemModel;