var inherit = axon.inherit;
var PropertySet = axon.PropertySet;


/**
 *
 * @param {string} type
 * @param {Image} appearanceImage
 * @param {Vector2} initialPosition
 * @param options
 * @constructor
 */
function BaseOrganismModel( type, appearanceImage, initialPosition, options ) {
  var thisModel = this;
  PropertySet.call( thisModel, {
    userControlled: false,
    position: initialPosition.copy(),
    type: type // the actual type for example if omnivorous is it a bird or human? We need to choose the icon based on that
  } );

  this.appearanceImage = appearanceImage;
  this.organismState = null;
  this.stateMachine = this.createStateMachine();

}


inherit( PropertySet, BaseOrganismModel, {

  step: function( dt ) {
    if ( !this.userControlled ) {
      // Update the state of the attachment state machine.
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

  returnToOrigin:function(){

  },


} );

module.exports = BaseOrganismModel;
