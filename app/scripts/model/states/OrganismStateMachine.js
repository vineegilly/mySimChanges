var inherit = axon.inherit;
var ReturnToOriginState = require( './ReturnToOriginState' );
var OrganismRestingState = require( './OrganismRestingState' );

var returnToOriginStateInstance = new ReturnToOriginState();
var organismRestingStateInstance = new OrganismRestingState();

/**
 *
 * @param {OrganismModel} organismModel
 * @param {EcoSystemModel} ecoSystemModel
 * @constructor
 */
function OrganismStateMachine( organismModel, ecoSystemModel ) {
  this.organismModel = organismModel;
  this.ecoSystemModel = ecoSystemModel;
  this.organismState = null;
}


inherit( Object, OrganismStateMachine, {

    /**
     * @param {number} dt
     */
    step: function( dt ) {
      // Step the current state in time.
      this.organismState.step( this, dt );
    },

    setState: function( newState ) {
      this.organismState = newState;
      this.organismState.entered( this );
    },

    returnToOrigin: function() {
      this.setState( returnToOriginStateInstance );
    },

    goToRest: function() {
      this.setState( organismRestingStateInstance );
    }

  },
//statics
  {
    returnToOriginStateInstance: returnToOriginStateInstance,
    organismRestingStateInstance: organismRestingStateInstance

  }
)
;


module.exports = OrganismStateMachine;