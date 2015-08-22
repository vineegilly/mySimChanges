// modules
var inherit = axon.inherit;
var CanvasNode = scenery.CanvasNode;

/**
 *
 * @param {Array} particles
 * @param options
 * @constructor
 */
function ParticleExplosionEffectNode( particleCollection, bounds ) {
  this.particleCollection = particleCollection;
  this.frameDelay = 0;
  CanvasNode.call( this, { pickable: false, canvasBounds: bounds, layerSplit: true } );
  this.invalidatePaint();
}

inherit( CanvasNode, ParticleExplosionEffectNode, {

  // @param {CanvasContextWrapper} wrapper
  paintCanvas: function( wrapper ) {
    var context = wrapper.context;
    var self = this;

    this.particleCollection.forEach( function( particles ) {
      // update and draw particles
      for ( var i = 0; i < particles.length; i++ ) {
        var particle = particles[ i ];
        particle.update( self.frameDelay );
        particle.draw( context );
      }
    } );

  },

  step: function( dt ) {
    this.frameDelay = dt;
    this.invalidatePaint();
  }

} );


module.exports = ParticleExplosionEffectNode;