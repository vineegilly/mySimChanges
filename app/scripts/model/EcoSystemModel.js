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
var EcoSystemConstants = require( './EcoSystemConstants' );


function EcoSystemModel( organismInfos, screenBounds ) {
  var thisModel = this;
  PropertySet.call( this, {
    playPause: false,
    populationRange: 1,
    rain: false,
    sunLight: false
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

  var refPopulationRange = this.populationRange;
  this.populationRangeProperty.lazyLink( function( newPopulationRange ) {
    newPopulationRange = newPopulationRange | 0;

    if ( refPopulationRange === newPopulationRange ) {
      return;
    }

    // assigning to populationRange property fires  eventListenr,so keeping a local varibale
    refPopulationRange = newPopulationRange;

    var existingModels = thisModel.residentOrganismModels.getArray();

    existingModels.forEach( function( organismModel ) {
      organismModel.multiply( newPopulationRange );
    } );


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

  reachedLimit: function() {
    if ( this.residentOrganismModels.length >= EcoSystemConstants.MAX_ORGANISMS ) {
      return true;
    }

    return false;
  },

  /**
   *
   * @param originalOrganism
   * @param initialPos
   * @param state
   * @returns {*}
   */
  cloneOrganism: function( originalOrganism, initialPos, interactionState, createdThroughInteraction ) {
    var newOrganismModel = originalOrganism.clone( initialPos, createdThroughInteraction );
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