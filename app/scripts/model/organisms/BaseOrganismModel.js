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
    position: initialPosition.copy()

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
