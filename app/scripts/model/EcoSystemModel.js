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

function EcoSystemModel( screenBounds ) {
  PropertySet.call( this, {} );
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

  },

  /**
   *
   * @param {OrganismModel} organismModel
   */
  addOrganism: function( organismModel ) {
    this.residentOrganismModels.add( organismModel );
  }
} );

module.exports = EcoSystemModel;