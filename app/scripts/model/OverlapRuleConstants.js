// names
/*
 beetle,grass,earthworm,flower,hawk,
 mushroom,snake,tree, mouse,butterfly,raccoon,
 deer,rabbit,coyote,frog,songbird
 */

var OverlapRuleConstants = {
  beetle: {
    prey: [ "songbird", "mouse","frog" ], predator: [ "grass", "flower", "tree" ]
  },
  grass: {
      prey: ["beetle","mouse","deer","rabbit","songbird"], predator:[]
  },
    flower: {
        prey:["beetle","mouse","deer","rabbit","butterfly"],predator:[]
    },

    tree: {
        prey :["beetle","mouse","deer","butterfly","songbird","raccoon"],predator: []
    },

    butterfly:{
        prey:["songbird","frog"],predator:["flower","tree"]
    },

    rabbit:  {
        prey: ["coyote","hawk"],predator:["mushroom","grass","flower"]
    },

    deer:{
        prey:["coyote"],predator:["mushroom","grass","flower","tree"]
    },

    songbird:{
        prey:["snake","hawk"],predator:["beetle","grass","earthworm","tree","butterfly"]
    },

    mouse:{
        prey:["raccoon","snake","hawk","coyote"],predator:["mushroom","grass","tree","beetle"]
    }

};


module.exports = OverlapRuleConstants;
