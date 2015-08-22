/**
 * The main model containing - EcoSystem
 * @author Sharfudeen Ashraf
 *
 */

// modules
var inherit = axon.inherit;
var PropertySet = axon.PropertySet;
var ObservableArray = axon.ObservableArray;
var OverlapRulesFactory = require( '../model/organisms/OverlapRulesFactory' );


function EcoSystemModel( organismInfos, screenBounds ) {
  var thisModel = this;
  PropertySet.call( this, {
    playPause: false
  } );

  this.organismInfos = organismInfos;

  this.screenBounds = screenBounds;

  // Observable array of the organisms that have been placed on grid
  this.residentOrganismModels = new ObservableArray();

  this.dyingModels = new ObservableArray();

  this.playPauseProperty.link( function( playPause ) {
    if ( playPause ) {
      thisModel.play();
    }
    else {
      thisModel.pause();
    }
  } );


}


inherit( PropertySet, EcoSystemModel, {
  /**
   * model related animation
   * @param dt
   */
  step: function( dt ) {
    var self = this;
    this.residentOrganismModels.forEach( function( organismModel ) {
      organismModel.step( dt );
    } );

    if ( this.isPlaying() ) {
      var allModels = [].concat( this.residentOrganismModels.getArray() );
      for ( var i = 0; i < allModels.length; i++ ) {
        for ( var j = 0; j < allModels.length; j++ ) {
          OverlapRulesFactory.applyOverlapRules( allModels[ i ], allModels[ j ] );
        }
      }
    }

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

  /**
   *
   * @param originalOrganism
   * @param initialPos
   * @param state
   * @returns {*}
   */
  cloneOrganism: function( originalOrganism, initialPos, interactionState ) {
    var newOrganismModel = originalOrganism.clone( initialPos );
    newOrganismModel.interactionState = interactionState;
    this.addOrganism( newOrganismModel );
    return newOrganismModel;
  },

  removeOrganism: function( organismModel ) {
    this.residentOrganismModels.remove( organismModel );
  },

  isPlaying: function() {
    return this.playPause === true;
  },

  onClearPlay: function() {
    this.residentOrganismModels.clear();
    this.playPause = false;
  },

  play: function() {
    this.residentOrganismModels.forEach( function( organismModel ) {
      organismModel.play();
    } );
  },

  pause: function() {
    this.residentOrganismModels.forEach( function( organismModel ) {
      organismModel.pause();
    } );
  },

  addDyingOrganisms: function( organismModel ) {
    this.dyingModels.add( organismModel );
  },

  removeDyingOrganisms: function( organismModel ) {
    this.dyingModels.remove( organismModel );
  }


} );

module.exports = EcoSystemModel;