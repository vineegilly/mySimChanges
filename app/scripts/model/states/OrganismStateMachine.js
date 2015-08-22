var inherit = axon.inherit;
var ReturnToOriginState = require( './ReturnToOriginState' );
var OrganismRestingState = require( './OrganismRestingState' );
var RandomMovementState = require( './RandomMovementState' );
var EatingState = require( './EatingState' );
var DyingState = require( './DyingState' );


var returnToOriginStateInstance = new ReturnToOriginState();
var organismRestingStateInstance = new OrganismRestingState();
var randomMovementState = new RandomMovementState();
var eatingState = new EatingState();
var dyingState = new DyingState();

/**
 *
 * @param {OrganismModel} organismModel
 * @constructor
 */
function OrganismStateMachine( organismModel ) {
  this.organismModel = organismModel;
  this.organismState = organismRestingStateInstance;

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
    },

    startRandomMotion: function() {
      this.setState( randomMovementState );
    },

    startEating: function() {
      this.setState( eatingState );
    },

    startDying: function() {
      this.setState( dyingState );
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