var inherit = axon.inherit;
var BaseProducerModel = require('./BaseProducerModel');
var GerminatingMixin = require('../GerminatingMixin');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function MushroomModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseProducerModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);
    _.extend(this, GerminatingMixin);
}

inherit(BaseProducerModel, MushroomModel, {

    clone: function (initialPos, createdThroughInteraction) {
        return new MushroomModel(this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds, createdThroughInteraction);
    }

});

module.exports = MushroomModel;
