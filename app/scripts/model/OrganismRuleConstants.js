// names
/*
 beetle,grass,earthworm,flower,hawk,
 mushroom,snake,tree, mouse,butterfly,raccoon,
 deer,rabbit,coyote,frog,songbird
 */
var d3 = require( 'd3' );
var colors = d3.scale.category20();

var OrganismRuleConstants = {
  beetle: {
    prey: [ "songbird", "mouse" ], predator: [ "grass", "flower", "tree" ],
    DIE_NO_FOOD: 6000,
    DIE_POISON: 3000,
    REPRODUCE_RULE: { offspring: 4, elapse: 12000 },
    color: colors( 0 )
  },
  grass: {
    prey: [ "beetle", "rabbit", "deer", "songbird", "mouse" ], predator: [],
    DIE_NO_FOOD: 6000,
    DIE_POISON: 2000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 }, // reproduce 2 per 12 ms
    PREDATOR_BUMP: 1,
    color: colors( 1 )
  },
  flower: {
    prey: [ "beetle", "butterfly", "rabbit", "deer" ], predator: [],
    DIE_NO_FOOD: 6000,
    DIE_POISON: 2000,
    REPRODUCE_RULE: { offspring: 3, elapse: 12000 }, // reproduce 2 per 12 ms
    PREDATOR_BUMP: 2,
    color: colors( 2 )
  },

  tree: {
    prey: [ "beetle", "butterfly", "deer", "songbird", "mouse" ], predator: [],
    DIE_NO_FOOD: 12000,
    DIE_POISON: 6000,
    REPRODUCE_RULE: { offspring: 1, elapse: 12000 }, // reproduce 2 per 12 ms
    PREDATOR_BUMP: 3,
    color: colors( 3 )
  },

  butterfly: {
    prey: [ "songbird" ], predator: [ "flower", "tree" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 4, elapse: 12000 },
    color: colors( 4 )
  },

  rabbit: {
    prey: [], predator: [ "grass", "flower" ],
    DIE_NO_FOOD: 12000,
    REPRODUCE_RULE: { offspring: 3, elapse: 12000 },
    color: colors( 5 )
  },

  deer: {
    prey: [], predator: [ "grass", "flower", "tree" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 },
    color: colors( 6 )
  },

  mouse: {
    prey: [], predator: [ "grass", "flower", "tree", "beetle" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 },
    color: colors( 7 )
  },

  //hawk is a predator of rabbit,songbird and mouse
  hawk: {
    prey: [], predator: [ "rabbit", "songbird", "mouse" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 1, elapse: 12000 },
    color: colors( 8 )
  },

  snake: {
    prey: [], predator: [ "songbird", "mouse" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 },
    color: colors( 9 )
  },
  raccoon: {
    prey: [], predator: [ "tree", "mouse" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 },
    color: colors( 10 )
  },
  coyote: {
    prey: [], predator: [ "rabbit", "deer", "mouse" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 },
    color: colors( 11 )
  },
  frog: {
    prey: [], predator: [ "beetle", "butterfly" ],
    NO_PREY: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 },
    color: colors( 12 )
  },
  songbird: {
    prey: [], predator: [ "grass", "tree", "beetle", "butterfly" ],
    DIE_NO_FOOD: 6000,
    REPRODUCE_RULE: { offspring: 2, elapse: 12000 },
    color: colors( 13 )
  },

  // earthworm and mushroom has different set of rules
  earthworm: {
    color: colors( 14 ),
    REPRODUCE_RULE: { offspring: 0, elapse: -1 }
  },

  mushroom: {
    color: colors( 15 ),
    REPRODUCE_RULE: { offspring: 0, elapse: -1 }
  }

};


module.exports = OrganismRuleConstants;
