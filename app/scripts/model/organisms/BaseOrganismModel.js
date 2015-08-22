var inherit = axon.inherit;
var PropertySet = axon.PropertySet;
var EcoSystemConstants = require( '../EcoSystemConstants' );
var Vector2 = dot.Vector2;
var OrganismImageCollection = require( '../organisms/OrganismImageCollection' );
var ParticleExplosionBuilder = require( '../effects/ParticleExplosionBuilder' );
var OrganismStateMachine = require( '../states/OrganismStateMachine' );

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function BaseOrganismModel( ecoSystemModel, organismInfo, initialPosition, bounds ) {
  var thisModel = this;
  PropertySet.call( thisModel, {
    userControlled: false,
    position: initialPosition.copy(),
    interactionState: EcoSystemConstants.NON_INTERACTION_STATE
  } );

  thisModel.organismInfo = organismInfo;
  thisModel.appearanceImage = OrganismImageCollection.getRepresentation( organismInfo.id );
  thisModel.ecoSystemModel = ecoSystemModel;
  thisModel.organismState = null;
  thisModel.stateMachine = this.createStateMachine();
  thisModel.velocity = EcoSystemConstants.ANIMATION_VELOCITY;
  this.motionBounds = bounds;
  this.particles = [];

  thisModel.positionProperty.lazyLink( function( position ) {
    if ( position.equals( initialPosition ) ) {
      thisModel.trigger( 'returnedToOrigin' );
    }

  } );

}


inherit( PropertySet, BaseOrganismModel, {

  step: function( dt ) {
    if ( !this.userControlled ) {
      this.stateMachine.step( dt );
    }
  },

  createStateMachine: function() {
    return new OrganismStateMachine( this );
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
    this.stateMachine.returnToOrigin();
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
    // console.log( "Bounds " + this.motionBounds + "  Contains  " + containsPoint + " point " + currentPosition );


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
  },

  buildExplosionParticles: function() {
    this.particles = ParticleExplosionBuilder.buildParticles( this.position.x, this.position.y, EcoSystemConstants.PARTICLE_COLOR );
  },

  play: function() {
    this.stateMachine.startRandomMotion();
  },

  pause: function() {
    this.stateMachine.goToRest();
  },

  canInteract: function() {
    return this.interactionState === EcoSystemConstants.NON_INTERACTION_STATE;
  },

  isPrey: function() {
    return this.organismInfo.prey;
  },

  isPredator: function() {
    return this.organismInfo.predator;
  },

  isProducer: function() {
    return this.organismInfo.producer;
  },

  isDecomposer: function() {
    return this.organismInfo.decomposer;
  },

  startDying: function() {
    this.ecoSystemModel.addDyingOrganisms( this );
    this.stateMachine.startDying();
    this.interactionState = EcoSystemConstants.DYING_STATE;
  },

  startEating: function() {
    this.stateMachine.startEating();
    this.interactionState = EcoSystemConstants.EATING_STATE;
  },

  die: function() {
    this.ecoSystemModel.removeDyingOrganisms( this );
    this.ecoSystemModel.removeOrganism( this );
  },

  overlapBounds: function( otherModel ) {

    var r1 = EcoSystemConstants.ORGANISM_RADIUS;
    var r2 = EcoSystemConstants.ORGANISM_RADIUS;

    var c1 = this.position;
    var c2 = otherModel.position;

    // Determine minimum and maximum radii where circles can intersect
    var r_max = r1 + r2;
    var r_min = Math.abs( r1 - r2 );

    // Determine actual distance between circle circles
    var c_dist = c1.distance( c2 );

    if ( c_dist > r_max ) {
      return false;
    }

    return true;
  }

} );

module.exports = BaseOrganismModel;
