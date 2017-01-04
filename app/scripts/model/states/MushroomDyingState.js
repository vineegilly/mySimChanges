var inherit = axon.inherit;
var BaseOrganismState = require('./BaseOrganismState');
var Vector2 = dot.Vector2;
var OrganismRuleConstants = require('../OrganismRuleConstants');
var GrassModel = require('../organisms/producers/GrassModel');
/**
 * Mushroom dying has a specialized behaviour, grass needs to grow at the same place where mushroom dies (provided it is raining)
 * @constructor
 */
function MushroomDyingState() {
    BaseOrganismState.call(this);
}

inherit(BaseOrganismState, MushroomDyingState, {

    /**
     *
     * @param {organism} organism that dies (mushroom)
     * @param {number} dt
     */
    step: function (organism, dt) {
        organism.opacity = Math.max(0, Math.min(organism.opacity - 0.05, 1));
        if (organism.opacity <= 0) {
            organism.die();

        }
    },

    //gets executed only once per state- using this code in "step" is wrong, because state's step will fired as long as the model's step gets its own share of time slice
    entered: function (organism) {

    },

    exit: function (organism) {
        //if it is raining add a Grass organism
        if (organism.ecoSystemModel.isRaining()) {
            var organismInfo = {
                name: "grass"
            };
            var newOrganism = new GrassModel(organism.ecoSystemModel, organismInfo, organism.position, organism.motionBounds);
            organism.ecoSystemModel.addOrganism(newOrganism)
        }
    }

});


module.exports = MushroomDyingState;
