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

}


inherit( PropertySet, BaseOrganismModel, {
  /**
   *
   * @returns {Vector2}
   */
  getPosition: function() {
    return this.position;
  },

  /**
   *
   * @param {Vector2} position
   */
  setPosition: function( position ) {
    this.position = position;
  }


} );

module.exports = BaseOrganismModel;
