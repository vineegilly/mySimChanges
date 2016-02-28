var inherit = axon.inherit;
var BaseDecomposerModel = require('./BaseDecomposerModel');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function MushroomModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseDecomposerModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);
}

inherit(BaseDecomposerModel, MushroomModel, {

    clone: function (initialPos, createdThroughInteraction) {
        return new MushroomModel(this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds, createdThroughInteraction);
    },

    play: function () {

    },

    //No movement override
    stepState: function (dt) {

    }


});

module.exports = MushroomModel;