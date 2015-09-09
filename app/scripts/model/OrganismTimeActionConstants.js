var OrganismTimeActionConstants = {

  GRASS_DIE_NO_RAIN: 6000,
  GRASS_DIE_HERBICIDE: 2000,
  GRASS_REPRODUCE_RULE: { max: 2, elapse: 12000 }, // reproduce 2 per 12 ms
  GRASS_PREDATOR_BUMP: 1,


  FLOWER_DIE_NO_RAIN: 6000,
  FLOWER_DIE_HERBICIDE: 2000,
  FLOWER_REPRODUCE_RULE: { max: 3, elapse: 12000 }, // reproduce 2 per 12 ms
  FLOWER_PREDATOR_BUMP: 2,

  TREE_DIE_NO_RAIN: 12000,
  TREE_DIE_HERBICIDE: 6000,
  TREE_REPRODUCE_RULE: { max: 1, elapse: 12000 }, // reproduce 2 per 12 ms
  TREE_PREDATOR_BUMP: 3

};


module.exports = OrganismTimeActionConstants;
