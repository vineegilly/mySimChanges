var inherit = axon.inherit;
var PropertySet = axon.PropertySet;

/**
 *
 * @constructor
 */
function BaseOrganismModel( initialPosition, options ) {
  var thisModel = this;
  PropertySet.call( thisModel, {
    userControlled: false,
    position: initialPosition.copy(),
    type: "" // the actual type for example if omnivorous is it a bird or human? We need to choose the icon based on that

  } );

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
