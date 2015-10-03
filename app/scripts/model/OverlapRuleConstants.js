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
        prey :["beetle","butterfly","deer","songbird","mouse"],predator: []
    },

    butterfly:{
        prey:["songbird"],predator:["flower","tree"]
    },

    rabbit:  {
        prey: [],predator:["grass","flower"]
    },

    deer:{
        prey:[],predator:["grass","flower","tree"]
    },

    mouse:{
        prey:[],predator:["grass","flower","tree","beetle"]
    },

    earthworm:{
        prey:["songbird"],predator:[]
    },

    hawk:{
        prey:[],predator:["rabbit","songbird","mouse"]
    },

    mushroom:{
        prey:["rabbit","deer","mouse"],predator:[]
    },
    snake:{
        prey:[],predator:["songbird","mouse"]
    },
    raccoon:{
        prey:[],predator:["tree","mouse"]
    },
    coyote:{
        prey:[],predator:["rabbit","deer","mouse"]
    },
    frog:{
        prey:[],predator:["beetle","butterfly"]
    },
    songbird:{
        prey:[],predator:["grass","tree","beetle","butterfly"]
    }

};


module.exports = OverlapRuleConstants;
