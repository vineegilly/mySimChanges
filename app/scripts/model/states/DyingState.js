var inherit = axon.inherit;
var BaseOrganismState = require( './BaseOrganismState' );
var Vector2 = dot.Vector2;

function DyingState() {
  BaseOrganismState.call( this );
}

inherit( BaseOrganismState, DyingState, {

  /**
   *
   * @param {OrganismModel} organism
   * @param {number} dt
   */
  step: function( organism, dt ) {
    organism.opacity = Math.max( 0, Math.min( organism.opacity - 0.05, 1 ) );
    if ( organism.opacity <= 0 ) {
      organism.die();
    }
  },

  entered: function( organism ) {

  },

  exit: function( organism ) {

  }

} );


module.exports = DyingState;
