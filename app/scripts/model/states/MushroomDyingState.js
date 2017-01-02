var inherit = axon.inherit;
var BaseOrganismState = require('./BaseOrganismState');
var Vector2 = dot.Vector2;

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
     * @param {OrganismModel} organism that dies (mushroom)
     * @param {number} dt
     */
    step: function (organism, dt) {

        organism.opacity = Math.max(0, Math.min(organism.opacity - 0.05, 1));
        if (organism.opacity <= 0) {
            organism.die();
        }

        if(organism.ecoSystemModel.isRaining()){

        }
    },

    entered: function (organism) {

    },

    exit: function (organism) {

    }

});


module.exports = MushroomDyingState;
