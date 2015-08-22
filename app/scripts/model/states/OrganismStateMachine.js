var inherit = axon.inherit;
var ReturnToOriginState = require( './ReturnToOriginState' );
var OrganismRestingState = require( './OrganismRestingState' );
var RandomMovementState = require( './RandomMovementState' );
var SupportReproducingState = require('./SupportReproducingState');
var ReproducingState = require('./ReproducingState');
var PredatingState = require( './PredatingState' );
var DyingState = require( './DyingState' );


var returnToOriginStateInstance = new ReturnToOriginState();
var organismRestingStateInstance = new OrganismRestingState();
var randomMovementState = new RandomMovementState();
var predatingState = new PredatingState();
var dyingState = new DyingState();
var reproducingState = new ReproducingState();
var supportReproducingState = new SupportReproducingState();


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

    startPredating: function() {
      this.setState( predatingState );
    },

    startDying: function() {
      this.setState( dyingState );
    },

    startReproducing:function(){
      this.setState( reproducingState );
    },

    supportReproducing:function(){
      this.setState( supportReproducingState );
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