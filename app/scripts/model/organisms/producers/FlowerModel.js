var inherit = axon.inherit;
var BaseProducerModel = require('./BaseProducerModel');
var GerminatingMixin = require('../GerminatingMixin');
var PollinateMixin = require('../PollinateMixin');

/**
 * @param {EcoSystemModel} ecoSystemModel
 * @param {jsonObject} organismInfo
 * @param {Vector2} initialPosition
 * @param {Bounds2} bounds
 * @constructor
 */
function FlowerModel(ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction) {
    BaseProducerModel.call(this, ecoSystemModel, organismInfo, initialPosition, bounds, createdThroughInteraction);
    _.extend(this, GerminatingMixin, PollinateMixin);
}

inherit(BaseProducerModel, FlowerModel, {

    clone: function (initialPos, createdThroughInteraction) {
        return new FlowerModel(this.ecoSystemModel, this.organismInfo, initialPos, this.motionBounds, createdThroughInteraction);
    }



});

module.exports = FlowerModel;