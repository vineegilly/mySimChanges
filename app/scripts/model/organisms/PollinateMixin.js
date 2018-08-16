var OrganismRuleConstants = require('../OrganismRuleConstants');
var EcoSystemConstants = require('../EcoSystemConstants');
var Vector2 = dot.Vector2;

var PollinateMixin = {


    /**
     * @override
     * @returns {boolean}
     */
    canPollinate: function () {
        return true;
    },

    canReproduce: function () {
        return true;
    },

    pollinate: function () {
        var noOfOffSpringToProduce = OrganismRuleConstants[this.name].PREDATOR_BUMP;

        for (var i = 0; i < noOfOffSpringToProduce; i++) {
            var newlyProducedModel = this.ecoSystemModel.cloneOrganism(this,
                new Vector2(this.position.x, this.position.y), EcoSystemConstants.BEING_PRODUCED_STATE, true);
            newlyProducedModel.timeElapsedSinceReproduction = 0;
            var clonePoint = this.position.plus(new Vector2(40, 40));
            var newPos = this.motionBounds.closestPointTo(clonePoint);
            newlyProducedModel.setPosition(newPos);
            this.ecoSystemModel.addNewlyReproducedOrganism(newlyProducedModel);
        }
    }
};

module.exports = PollinateMixin;