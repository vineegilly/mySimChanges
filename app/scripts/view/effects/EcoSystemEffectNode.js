// modules
var inherit = axon.inherit;
var CanvasNode = scenery.CanvasNode;
var ObservableArray = axon.ObservableArray;
var ParticleExplosionBuilder = require( '../../model/effects/ParticleExplosionBuilder' );
var EcoSystemConstants = require( '../../model/EcoSystemConstants' );

/**
 *
 * @param {EcoSystemModel} ecoSystemModel
 * @param options
 * @constructor
 */
function EcoSystemEffectNode( ecoSystemModel, bounds ) {
  var thisNode = this;
  this.dyingParticleCollection = new ObservableArray();
  this.frameDelay = 0;
  CanvasNode.call( this, { pickable: false, canvasBounds: bounds, layerSplit: true } );

  function handleOrganismDying( addedOrganismModel ) {
    var position = addedOrganismModel.position;
    var dyingParticles = ParticleExplosionBuilder.buildParticles( position.x, position.y, EcoSystemConstants.PARTICLE_COLOR );
    thisNode.dyingParticleCollection.add( dyingParticles );

    ecoSystemModel.dyingModels.addItemRemovedListener( function removalListener( removedOrganismModel ) {
      if ( removedOrganismModel === addedOrganismModel ) {
        thisNode.dyingParticleCollection.remove( dyingParticles );
        ecoSystemModel.dyingModels.removeItemRemovedListener( removalListener );
      }
    } );
  }

  ecoSystemModel.dyingModels.addItemAddedListener( handleOrganismDying );

  this.invalidatePaint();
}

inherit( CanvasNode, EcoSystemEffectNode, {

  // @param {CanvasContextWrapper} wrapper
  paintCanvas: function( wrapper ) {
    var context = wrapper.context;
    var self = this;

    this.dyingParticleCollection.forEach( function( particles ) {
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


module.exports = EcoSystemEffectNode;