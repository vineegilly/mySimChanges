var inherit = axon.inherit;
var BaseOrganismModel = require( './BaseOrganismModel' );
var OrganismImageCollection = require( './OrganismImageCollection' );
var ConsumerStateMachine = require('../states/ConsumerStateMachine');


/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {string} type // ex carniovores
 * @param {imageNode} icon // a carnivores can be represented by different icons
 * @param {Vector2} pos // initial Position
 * @param {Bounds2} bounds
 * @constructor
 */
function ConsumerModel( ecoSystemModel,type, icon, pos,bounds ) {
  BaseOrganismModel.call( this, ecoSystemModel,type, icon, pos.bounds );

}

inherit( BaseOrganismModel, ConsumerModel, {
  createStateMachine: function() {
    return new ConsumerStateMachine(this);
  }
} );

module.exports = ConsumerModel;