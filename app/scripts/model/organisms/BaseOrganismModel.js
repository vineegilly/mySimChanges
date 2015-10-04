var inherit = axon.inherit;
var PropertySet = axon.PropertySet;
var EcoSystemConstants = require( '../EcoSystemConstants' );
var Vector2 = dot.Vector2;
var OrganismImageCollection = require( '../organisms/OrganismImageCollection' );
var _ = require( 'lodash' );

//states
var ReturnToOriginState = require( '../states/ReturnToOriginState' );
var OrganismRestingState = require( '../states/OrganismRestingState' );
var RandomMovementState = require( '../states/RandomMovementState' );
var SupportReproducingState = require( '../states/SupportReproducingState' );
var ReproducingState = require( '../states/ReproducingState' );
var PredatingState = require( '../states/PredatingState' );
var DyingState = require( '../states/DyingState' );
var OverlapRuleConstants = require( '../../model/OverlapRuleConstants' );


var returnToOriginStateInstance = new ReturnToOriginState();
var organismRestingStateInstance = new OrganismRestingState();
var randomMovementState = new RandomMovementState();
var predatingState = new PredatingState();
var dyingState = new DyingState();
var reproducingState = new ReproducingState();
var supportReproducingState = new SupportReproducingState();

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} motionBounds
 * @constructor
 */
function BaseOrganismModel( ecoSystemModel, organismInfo, initialPosition, motionBounds, createdThroughInteraction ) {
  var thisModel = this;
  PropertySet.call( thisModel, {
    userControlled: false,
    position: initialPosition.copy(),
    interactionState: EcoSystemConstants.NON_INTERACTION_STATE,
    dead: false,
    scale: 1,
    opacity: 1
  } );

  thisModel.name = organismInfo.name;
  thisModel.organismInfo = organismInfo;
  thisModel.appearanceImage = OrganismImageCollection.getRepresentation( thisModel.name );
  thisModel.ecoSystemModel = ecoSystemModel;
  thisModel.organismState = organismRestingStateInstance;
  thisModel.velocity = EcoSystemConstants.ANIMATION_VELOCITY;

  // some models gets created through interaction
  thisModel.createdThroughInteraction = createdThroughInteraction;

  thisModel.organismBeingEaten = null;
  thisModel.organismReproducingWith = null;
  thisModel.newlyProducedModel = null;
  this.motionBounds = motionBounds;
  this.multipliedOrganisms = [ this ];// add the current one

  // initially make it ready, but for the one created through interaction, set them zero to start with
  thisModel.reproductionMinimumLapsedTimes = createdThroughInteraction ? 0 : EcoSystemConstants.MIN_REPRODUCTION_LAPSE + 1;
  thisModel.predatingMiniumLapsedTimes = createdThroughInteraction ? 0 : EcoSystemConstants.MIN_PREDATE_LAPSE + 1;

  thisModel.positionProperty.lazyLink( function( position ) {
    if ( position.equals( initialPosition ) && !createdThroughInteraction ) {
      thisModel.trigger( 'returnedToOrigin' );
    }

  } );

  //temp
  this.elapsedTime = 0;

}


inherit( PropertySet, BaseOrganismModel, {

  step: function( dt ) {
    if ( !this.userControlled ) {
      this.stepState( dt );
      this.doStep( dt );
    }
    // console.log( "Time Elapsed " + this.elapsedTime + " Date " + new Date() )
  },

  /**
   *
   * @param {number} dt
   */
  stepState: function( dt ) {
    this.organismState.step( this, dt );
  },

  setState: function( newState ) {
    this.organismState.exit( this );// exist the previus state
    this.organismState = newState;
    this.organismState.entered( this ); // enter the new state
  },

  returnToOriginState: function() {
    this.setState( returnToOriginStateInstance );
  },

  goToRest: function() {
    this.setState( organismRestingStateInstance );
  },

  startRandomMotion: function() {
    this.setState( randomMovementState );
  },

  startPredating: function( preyBeingEaten ) {
    this.setState( predatingState );
    this.organismBeingEaten = preyBeingEaten;
    var preyPosition = preyBeingEaten.position;
    this.setDestination( preyPosition, true, EcoSystemConstants.ANIMATION_VELOCITY / 2 );
    this.interactionState = EcoSystemConstants.EATING_STATE;
    this.predatingMiniumLapsedTimes = 0;
  },

  startDying: function() {
    this.setState( dyingState );
    this.ecoSystemModel.addDyingOrganisms( this );
    this.interactionState = EcoSystemConstants.DYING_STATE;
  },

  startReproducing: function( otherOrganism ) {
    //store the partner
    this.organismReproducingWith = otherOrganism;
    var otherPartnerPos = otherOrganism.position;
    this.setDestination( otherPartnerPos, true, EcoSystemConstants.ANIMATION_VELOCITY / 2 );
    this.interactionState = EcoSystemConstants.REPRODUCING_STATE;

    //set the current state
    this.setState( reproducingState );
    otherOrganism.supportReproducing();
    this.reproductionMinimumLapsedTimes = 0;
  },

  supportReproducing: function() {
    this.interactionState = EcoSystemConstants.REPRODUCING_STATE;
    this.reproductionMinimumLapsedTimes = 0;
    //set the current to support reproducing
    this.setState( supportReproducingState );
  },

  doStep: function( dt ) {

  },

  /**
   * called when population Range slider is invoked
   * @param newRange
   */
  multiply: function( newRange ) {

    // only original elements can be multiplied
    if ( this.createdThroughInteraction ) {
      return;
    }

    if ( this.multipliedOrganisms.length === newRange ) {
      return;
    }

    if ( this.multipliedOrganisms.length > newRange ) {
      for ( var i = newRange; i < this.multipliedOrganisms.length; i++ ) {
        var organism = this.multipliedOrganisms[ i ];
        this.ecoSystemModel.removeOrganism( organism );
      }

      this.multipliedOrganisms.splice( newRange );
    }

    else {
      var newOrganisms = [];

      for ( var j = this.multipliedOrganisms.length; j < newRange; j++ ) {
        var randomPosX = _.random( this.motionBounds.minX, this.motionBounds.maxX );
        var randomPosY = _.random( this.motionBounds.minY, this.motionBounds.maxY );
        var newPos = this.motionBounds.closestPointTo( new Vector2( randomPosX, randomPosY ) );
        var newMultipliedOrganism = this.ecoSystemModel.cloneOrganism( this, newPos, EcoSystemConstants.NON_INTERACTION_STATE, true );
        newOrganisms.push( newMultipliedOrganism );
      }

      this.multipliedOrganisms = this.multipliedOrganisms.concat( newOrganisms );
    }
  },

  canReproduce: function() {
    if ( this.reproductionMinimumLapsedTimes > EcoSystemConstants.MIN_REPRODUCTION_LAPSE ) {
      return true;
    }
    return false;
  },

  canPredate: function() {
    if ( this.predatingMiniumLapsedTimes > EcoSystemConstants.MIN_PREDATE_LAPSE ) {
      return true;
    }
    return false;
  },

  /**
   * Organisms like Grass,Flower,Tree override this class because they dont move
   */
  initState: function() {
    this.setState( randomMovementState );
  },

  /**
   *
   * @returns {Vector2}
   */
  getPosition: function() {
    return this.position;
  },

  moveRandomly: function() {
    throw new Error( "moveRandomly must be implemented in  BaseOrganismModel's descendant class" );
  },


  clone: function( initialPos ) {
    throw new Error( "clone must be implemented in  BaseOrganismModel's descendant class" );
  },


  /**
   *
   * @param {Vector2} position
   */
  setPosition: function( position ) {
    this.position = position;
  },

  /**
   * Return the shape to the place where it was originally created.
   * @param {boolean} animate
   * @param {number} velocity
   */
  returnToOrigin: function( animate, velocity ) {
    this.velocity = velocity || EcoSystemConstants.ANIMATION_VELOCITY;
    this.setDestination( this.positionProperty.initialValue, animate );

  },

  /**
   * @param {Vector2} destination
   * @param {boolean} animate
   * @param {number} velocity
   */
  setDestination: function( destination, animate, velocity ) {
    this.destination = destination;
    this.velocity = velocity || EcoSystemConstants.ANIMATION_VELOCITY;
    if ( animate ) {
      this.animating = true;
    }
    else {
      this.position = destination;
    }
  },

  nextRandomMovement: function() {
    var direction = _.random( 1, 4 );
    var playVelocity = EcoSystemConstants.ANIMATION_VELOCITY / 10;
    var currentPosition = this.position;

    var containsPoint = this.motionBounds.containsPoint( currentPosition );

    var newPosition = null;
    var animatePlay = true;
    switch( direction ) {
      case 1:
        newPosition = currentPosition.plus( new Vector2( EcoSystemConstants.PLAY_STEP_DISTANCE, 0 ) );
        newPosition = this.motionBounds.closestPointTo( newPosition );
        this.setDestination( newPosition, animatePlay, playVelocity );
        break;
      case 2:
        newPosition = currentPosition.plus( new Vector2( -EcoSystemConstants.PLAY_STEP_DISTANCE, 0 ) );
        newPosition = this.motionBounds.closestPointTo( newPosition );
        this.setDestination( newPosition, animatePlay, playVelocity );
        break;
      case 3:
        newPosition = currentPosition.plus( new Vector2( 0, EcoSystemConstants.PLAY_STEP_DISTANCE ) );
        newPosition = this.motionBounds.closestPointTo( newPosition );
        this.setDestination( newPosition, animatePlay, playVelocity );
        break;
      case 4:
        newPosition = currentPosition.plus( new Vector2( 0, -EcoSystemConstants.PLAY_STEP_DISTANCE ) );
        newPosition = this.motionBounds.closestPointTo( newPosition );
        this.setDestination( newPosition, animatePlay, playVelocity );
        break;
    }

    this.reproductionMinimumLapsedTimes++;
    this.predatingMiniumLapsedTimes++;
  },

  play: function() {
    this.setState( randomMovementState );
  },

  pause: function() {
    this.goToRest();
  },


  canInteract: function() {
    if ( this.interactionState === EcoSystemConstants.NON_INTERACTION_STATE ) {
      return true;
    }
    if ( this.interactionState === EcoSystemConstants.BEING_PRODUCED_STATE ) {
      return true;
    }

    return false;
  },

  isDead: function() {
    return this.dead;
  },

  /**
   * check if this organism is a prey with respect to the given predator (also checks for producer/consumer)
   * @returns {*}
   */
  isPrey: function( withRespectToPredator ) {
    var preyPredatorRule = OverlapRuleConstants[ withRespectToPredator.name ];
    if ( preyPredatorRule ) {
      var listOfPreys = preyPredatorRule[ "prey" ];
      if ( listOfPreys ) {
        return _.contains( listOfPreys, this.name );
      }
    }
    return false;
  },

  /**
   * Checks if this object is a predator with respect to a given prey
   *
   * @param withRespectToPrey
   * @returns {boolean}
   */
  isPredator: function( withRespectToPrey ) {
    var preyPredatorRule = OverlapRuleConstants[ withRespectToPrey.name ];
    if ( preyPredatorRule ) {
      var listOfPredators = preyPredatorRule[ "predator" ];
      if ( listOfPredators ) {
        return _.contains( listOfPredators, this.name );
      }
    }
    return false;
  },

  isEating: function() {
    return this.interactionState === EcoSystemConstants.EATING_STATE;
  },


  die: function() {
    this.ecoSystemModel.removeDyingOrganisms( this );
    this.ecoSystemModel.removeOrganism( this );
    this.dead = true;
  },

  finishEating: function() {
    this.interactionState = EcoSystemConstants.NON_INTERACTION_STATE;
    this.setState( randomMovementState );

  },

  overlapBounds: function( otherModel ) {
    var r1 = EcoSystemConstants.ORGANISM_RADIUS;
    var r2 = EcoSystemConstants.ORGANISM_RADIUS;

    var tolerance = 15;

    var c1 = this.position;
    var c2 = otherModel.position;

    // Determine minimum and maximum radii where circles can intersect
    var r_max = r1 + r2;
    var r_min = Math.abs( r1 - r2 );

    // Determine actual distance between circle circles
    var c_dist = c1.distance( c2 );

    c_dist += tolerance;

    if ( c_dist > r_max ) {
      return false;
    }

    return true;
  },

  reproduceWith: function( otherModel ) {
    var thisPos = this.position;
    var otherPos = otherModel.position;
    var midPoint = thisPos.average( otherPos );
    var createdThroughInteraction = true;
    this.newlyProducedModel = this.ecoSystemModel.cloneOrganism( this, midPoint, EcoSystemConstants.BEING_PRODUCED_STATE, createdThroughInteraction );
    this.ecoSystemModel.addNewlyReproducedOrganism( this.newlyProducedModel );
  },


  finishReproducing: function() {
    this.interactionState = EcoSystemConstants.NON_INTERACTION_STATE;
    this.setState( randomMovementState );
    if ( this.newlyProducedModel ) {
      this.newlyProducedModel.interactionState = EcoSystemConstants.NON_INTERACTION_STATE;
      this.newlyProducedModel.reproductionMinimumLapsedTimes = 0;
      this.newlyProducedModel.play();
      this.newlyProducedModel = null;
    }
  }

} );

module.exports = BaseOrganismModel;
