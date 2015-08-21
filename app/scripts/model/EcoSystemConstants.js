var Color = scenery.Color;
var SimFont = require( '../core/SimFont' );
var Dimension2 = dot.Dimension2;


var EcoSystemConstants = {

    GRID_BACKGROUND_COLOR: new Color( 255, 255, 255 ),
    ORGANISM_BACKGROUND_COLOR: new Color( 120, 125, 200 ),
    PLAYER_PANEL_BACKGROUND_COLOR: new Color( 239, 239, 195 ),
    GRID_PANEL_STROKE_COLOR: new Color( 100, 100, 100 ),
    PANEL_TITLE_FONT: new SimFont( { family: 'Futura', size: 18, weight: 'bold' } ),
    ANIMATION_VELOCITY: 500,
    PLAY_STEP_DISTANCE: 60,
    ORGANISM_RADIUS: 45,
    GRID_NODE_DIMENSION: new Dimension2( 930, 360 ),
    PARTICLE_COLOR: new Color( 255, 0, 0 ),

// interaction states
    BEING_EATEN_STATE: 1,
    EATING_STATE: 2,
    NON_INTERACTION_STATE: 0,

    CARNIVORES: 1,
    DECOMPOSERS: 2,
    HERBIVORES: 3,
    OMNIVORES: 4,
    PRODUCERS: 5,


  }
  ;


module.exports = EcoSystemConstants;