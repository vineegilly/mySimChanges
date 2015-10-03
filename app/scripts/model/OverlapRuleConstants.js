// names
/*
 beetle,grass,earthworm,flower,hawk,
 mushroom,snake,tree, mouse,butterfly,raccoon,
 deer,rabbit,cayote,frog,songbird
 */

var OverlapRuleConstants = {
  beetle: {
    prey: [ "songbird", "mouse" ], predator: [ "grass", "flower", "tree" ]
  },
  grass: {}

};


module.exports = OverlapRuleConstants;
