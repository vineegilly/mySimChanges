var inherit = axon.inherit;
var PropertySet = axon.PropertySet;
var EcoSystemConstants = require( '../EcoSystemConstants' );
var Vector2 = dot.Vector2;


/**
 * @param {string} type
 * @param {EcoSystemModel} ecoSystemModel
 * @param {Image} appearanceImage
 * @param {Vector2} initialPosition
 * @param options
 * @constructor
 */
function BaseOrganismModel( ecoSystemModel, type, appearanceImage, initialPosition, options ) {
  var thisModel = this;
  PropertySet.call( thisModel, {
    userControlled: false,
    position: initialPosition.copy(),
    type: type // the actual type for example if omnivorous is it a bird or human? We need to choose the icon based on that
  } );

  thisModel.appearanceImage = appearanceImage;
  thisModel.ecoSystemModel = ecoSystemModel;
  thisModel.organismState = null;
  thisModel.stateMachine = this.createStateMachine();
  thisModel.velocity = EcoSystemConstants.ANIMATION_VELOCITY;

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
    throw new Error( "createStateMachine must be implemented in  BaseOrganismModel's descendant class" );
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
    if ( !velocity ) {
      this.velocity = EcoSystemConstants.ANIMATION_VELOCITY;
    }
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
    if ( !velocity ) {
      this.velocity = EcoSystemConstants.ANIMATION_VELOCITY;
    }
    if ( animate ) {
      this.animating = true;
    }
    else {
      this.position = destination;
    }
  },

  nextRandomMovement: function() {
    var direction = _.random( 1, 4 );
    var playVelocity = EcoSystemConstants.ANIMATION_VELOCITY / 3;
    var currentPosition = this.position;
    switch( direction ) {
      case 1:
        this.setDestination( currentPosition.plus( new Vector2( EcoSystemConstants.PLAY_STEP_DISTANCE, 0 ) ), true, playVelocity );
        break;
      case 2:
        this.setDestination( currentPosition.plus( new Vector2( -EcoSystemConstants.PLAY_STEP_DISTANCE, 0 ) ), true, playVelocity );
        break;
      case 3:
        this.setDestination( currentPosition.plus( new Vector2( 0, EcoSystemConstants.PLAY_STEP_DISTANCE ) ), true, playVelocity );
        break;
      case 4:
        this.setDestination( currentPosition.plus( new Vector2( 0, -EcoSystemConstants.PLAY_STEP_DISTANCE ) ), true, playVelocity );
        break;
    }
  },

  play: function() {
    this.stateMachine.startRandomMotion();
  }


} );

module.exports = BaseOrganismModel;
