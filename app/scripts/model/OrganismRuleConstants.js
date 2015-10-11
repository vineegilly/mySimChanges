// names
/*
 beetle,grass,earthworm,flower,hawk,
 mushroom,snake,tree, mouse,butterfly,raccoon,
 deer,rabbit,coyote,frog,songbird
 */

var OrganismRuleConstants = {
  beetle: {
    prey: [ "songbird", "mouse" ], predator: [ "grass", "flower", "tree" ],
    DIE_NO_FOOD: 6000,
    DIE_POISON: 3000,
    REPRODUCE_RULE: { offspring: 4, elapse: 12000 }
  },
  grass: {
    prey: [ "beetle", "rabbit", "deer", "songbird", "mouse" ], predator: [],
    DIE_NO_FOOD: 6000,
    DIE_POISON: 2000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 }, // reproduce 2 per 12 ms
    PREDATOR_BUMP: 1
  },
  flower: {
    prey: [ "beetle", "butterfly", "rabbit", "deer" ], predator: [],
    DIE_NO_FOOD: 6000,
    DIE_POISON: 2000,
    REPRODUCE_RULE: { offspring: 3, elapse: 12000 }, // reproduce 2 per 12 ms
    PREDATOR_BUMP: 2
  },

  tree: {
    prey: [ "beetle", "butterfly", "deer", "songbird", "mouse" ], predator: [],
    DIE_NO_FOOD: 12000,
    DIE_POISON: 6000,
    REPRODUCE_RULE: { offspring: 1, elapse: 12000 }, // reproduce 2 per 12 ms
    PREDATOR_BUMP: 3
  },

  butterfly: {
    prey: [ "songbird" ], predator: [ "flower", "tree" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 4, elapse: 12000 }
  },

  rabbit: {
    prey: [], predator: [ "grass", "flower" ],
    DIE_NO_FOOD: 12000,
    REPRODUCE_RULE: { offspring: 3, elapse: 12000 }
  },

  deer: {
    prey: [], predator: [ "grass", "flower", "tree" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 }
  },

  mouse: {
    prey: [], predator: [ "grass", "flower", "tree", "beetle" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 }
  },

  //hawk is a predator of rabbit,songbird and mouse
  hawk: {
    prey: [], predator: [ "rabbit", "songbird", "mouse" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 1, elapse: 12000 }
  },

  snake: {
    prey: [], predator: [ "songbird", "mouse" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 }
  },
  raccoon: {
    prey: [], predator: [ "tree", "mouse" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 }
  },
  coyote: {
    prey: [], predator: [ "rabbit", "deer", "mouse" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 }
  },
  frog: {
    prey: [], predator: [ "beetle", "butterfly" ],
    NO_PREY: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 }
  },
  songbird: {
    prey: [], predator: [ "grass", "tree", "beetle", "butterfly" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 }
  },


  // earthworm and mushroom has different set of rules
  earthworm: {

  },

  mushroom: {

   }

};


module.exports = OrganismRuleConstants;
