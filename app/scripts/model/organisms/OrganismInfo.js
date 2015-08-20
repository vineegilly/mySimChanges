var inherit = axon.inherit;

/**
 *
 * @param id
 * @param type
 * @param prey
 * @param predator
 * @param producer
 * @param decomposer
 * @constructor
 */
function OrganismInfo( jsonInfo ) {
  this.id = jsonInfo.id;
  this.type = jsonInfo.type;
  this.name = jsonInfo.name;
  this.prey = jsonInfo.prey;
  this.predator = jsonInfo.predator;
  this.producer = jsonInfo.producer;
  this.decomposer = jsonInfo.decomposer;
}

inherit( Object, OrganismInfo );


module.exports = OrganismInfo;