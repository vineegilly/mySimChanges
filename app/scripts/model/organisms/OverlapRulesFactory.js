var inherit = axon.inherit;
var EcoSystemConstants = require( '../../model/EcoSystemConstants' );

function OverlapRulesFactory() {

}


inherit( Object, OverlapRulesFactory, {},

  // statics
  {
    applyOverlapRules: function( organism1, organism2 ) {
      if ( organism1.canInteract() && organism2.canInteract() ) {

        var preyPredatorRule = this.checkForPreyPredatorRule( organism1, organism2 );
        if ( preyPredatorRule.prey && preyPredatorRule.predator ) {
          this.preyOverlapWithPredator( preyPredatorRule.prey, preyPredatorRule.predator );
          return;
        }

      }
    },

    checkForPreyPredatorRule: function( organism1, organism2 ) {
      var preyPredatorRule = {};
      if ( organism1.isPrey() ) {
        preyPredatorRule[ "prey" ] = organism1;
      }
      if ( organism2.isPrey() ) {
        preyPredatorRule[ "prey" ] = organism2;
      }
      if ( organism1.isPredator() ) {
        preyPredatorRule[ "predator" ] = organism1;
      }
      if ( organism2.isPredator() ) {
        preyPredatorRule[ "predator" ] = organism2;
      }

      return preyPredatorRule;

    },

    preyOverlapWithPredator: function( prey, predator ) {
      if ( prey.overlapBounds( predator ) ) {
        var preyPosition = prey.position;
        predator.setDestination( preyPosition, true, EcoSystemConstants.ANIMATION_VELOCITY * 2 );
        prey.startDying();
        predator.startEating();
      }
    }

  } );

module.exports = OverlapRulesFactory;