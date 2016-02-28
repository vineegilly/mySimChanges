// names
/*
 beetle,grass,earthworm,flower,hawk,
 mushroom,snake,tree, mouse,butterfly,raccoon,
 deer,rabbit,coyote,frog,songbird
 */
var d3 = require('d3');


var OrganismRuleConstants = {
    beetle: {
        prey: ["songbird", "mouse"], predator: ["grass", "flower", "tree"],
        DIE_NO_FOOD: 6000,
        DIE_POISON: 3000,
        REPRODUCE_RULE: {offspring: 4, elapse: 12000},
        color: "#a6cee3"
    },
    grass: {
        prey: ["beetle", "rabbit", "deer", "songbird", "mouse"], predator: [],
        DIE_NO_FOOD: 6000,
        DIE_POISON: 2000,
        REPRODUCE_RULE: {offspring: 1, elapse: 12000}, // reproduce 2 per 12 ms
        PREDATOR_BUMP: 1,
        color: "#1f78b4"
    },
    flower: {
        prey: ["beetle", "butterfly", "rabbit", "deer"], predator: [],
        DIE_NO_FOOD: 6000,
        DIE_POISON: 2000,
        REPRODUCE_RULE: {offspring: 3, elapse: 12000}, // reproduce 2 per 12 ms
        PREDATOR_BUMP: 2,
        color: "#b2df8a"
    },

    tree: {
        prey: ["beetle", "butterfly", "deer", "songbird", "mouse"], predator: [],
        DIE_NO_FOOD: 12000,
        DIE_POISON: 6000,
        REPRODUCE_RULE: {offspring: 1, elapse: 12000}, // reproduce 2 per 12 ms
        PREDATOR_BUMP: 3,
        color: "#33a02c"
    },

    butterfly: {
        prey: ["songbird"], predator: ["flower", "tree"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 4, elapse: 12000},
        color: "#fb9a99"
    },

    rabbit: {
        prey: [], predator: ["grass", "flower"],
        DIE_NO_FOOD: 12000,
        REPRODUCE_RULE: {offspring: 3, elapse: 12000},
        color: "#e31a1c"
    },

    deer: {
        prey: [], predator: ["grass", "flower", "tree"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#fdbf6f"
    },

    mouse: {
        prey: [], predator: ["grass", "flower", "tree", "beetle"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#ff7f00"
    },

    //hawk is a predator of rabbit,songbird and mouse
    hawk: {
        prey: [], predator: ["rabbit", "songbird", "mouse"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 1, elapse: 12000},
        color: "#cab2d6"
    },

    snake: {
        prey: [], predator: ["songbird", "mouse"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#67001f"
    },
    raccoon: {
        prey: [], predator: ["tree", "mouse"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#6a3d9a"
    },
    coyote: {
        prey: [], predator: ["rabbit", "deer", "mouse"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#543005"
    },
    frog: {
        prey: [], predator: ["beetle", "butterfly"],
        NO_PREY: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#003c30"
    },
    songbird: {
        prey: [], predator: ["grass", "tree", "beetle", "butterfly"],
        DIE_NO_FOOD: 6000,
        REPRODUCE_RULE: {offspring: 2, elapse: 12000},
        color: "#ffff99"
    },

    // earthworm and mushroom has different set of rules
    earthworm: {
        color: "#b2182b",
        REPRODUCE_RULE: {offspring: 1, elapse: 12000}

    },

    mushroom: {
        color: "#c51b7d",
        REPRODUCE_RULE: {offspring: 1, elapse: 12000},
        growsByRain: true
    }

};


module.exports = OrganismRuleConstants;
