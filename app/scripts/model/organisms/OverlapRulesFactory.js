var inherit = axon.inherit;
var EcoSystemConstants = require( '../../model/EcoSystemConstants' );

function OverlapRulesFactory() {

}


inherit( Object, OverlapRulesFactory, {},

  // statics
  {
    applyOverlapRules: function( organism1, organism2 ) {
      if ( organism1 === organism2 ) {
        return;
      }
      if ( organism1.canInteract() && organism2.canInteract() ) {

        var preyPredatorOverlapResult = this.checkForPreyPredatorRule( organism1, organism2 );
        if ( preyPredatorOverlapResult.prey && preyPredatorOverlapResult.predator ) {
          this.preyOverlapWithPredator( preyPredatorOverlapResult.prey, preyPredatorOverlapResult.predator );
          return;
        }

      }
    },

    checkForPreyPredatorRule: function( organism1, organism2 ) {
      var preyPredatorOverlapResult = {};
      if ( organism1.isPrey() ) {
        preyPredatorOverlapResult[ "prey" ] = organism1;
      }
      if ( organism2.isPrey() ) {
        preyPredatorOverlapResult[ "prey" ] = organism2;
      }
      if ( organism1.isPredator() ) {
        preyPredatorOverlapResult[ "predator" ] = organism1;
      }
      if ( organism2.isPredator() ) {
        preyPredatorOverlapResult[ "predator" ] = organism2;
      }

      return preyPredatorOverlapResult;

    },

    preyOverlapWithPredator: function( prey, predator ) {
      if ( prey.overlapBounds( predator ) ) {
        var preyPosition = prey.position;
        predator.setDestination( preyPosition, true, EcoSystemConstants.ANIMATION_VELOCITY / 2 );
        predator.startEating();
        prey.startDying();
      }
    }

  } );

module.exports = OverlapRulesFactory;