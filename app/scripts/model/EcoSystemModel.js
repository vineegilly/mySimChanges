/**
 * The main model containing - EcoSystem
 * @author Sharfudeen Ashraf
 *
 */

// modules
var inherit = axon.inherit;
var PropertySet = axon.PropertySet;
var ObservableArray = axon.ObservableArray;

function EcoSystemModel( screenBounds ) {
  PropertySet.call( this, {} );
  this.screenBounds = screenBounds;

  // Observable array of the organisms that have been placed on grid
  this.residentOrganismModels = new ObservableArray();

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