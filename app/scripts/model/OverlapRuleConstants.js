// names
/*
 beetle,grass,earthworm,flower,hawk,
 mushroom,snake,tree, mouse,butterfly,raccoon,
 deer,rabbit,coyote,frog,songbird
 */

var OverlapRuleConstants = {
  beetle: {
    prey: [ "songbird", "mouse"], predator: [ "grass", "flower", "tree" ]
  },
  grass: {
      prey: ["beetle","rabbit","deer","songbird","mouse"], predator:[]
  },
    flower: {
        prey:["beetle","butterfly","rabbit","deer"],predator:[]
    },

    tree: {
        prey :["beetle","butterfly","deer","mouse","songbird"],predator: []
    },

    butterfly:{
        prey:["songbird"],predator:["flower","tree"]
    },

    rabbit:  {
        prey: [],predator:["grass","flower"]
    },

    deer:{
        prey:[],predator:["mushroom","grass","flower","tree"]
    },

    songbird:{
        prey:["snake","hawk"],predator:["grass","tree","beetle","butterfly"]
    },

    mouse:{
        prey:[],predator:["grass","flower","tree","beetle"]
    }

};


module.exports = OverlapRuleConstants;
