var Color = scenery.Color;
var SimFont = require( '../core/SimFont' );
var Dimension2 = dot.Dimension2;
var Image = scenery.Image;
var hawk = require( "../../assets/images/hawk.png" );

var imageNode = new Image( hawk );

var IMAGE_SCALE = 1;
imageNode.scale( IMAGE_SCALE );


var EcoSystemConstants = {

    GRID_BACKGROUND_COLOR: new Color( 255, 255, 255 ),
    ORGANISM_BACKGROUND_COLOR: new Color( 120, 125, 200 ),
    PLAYER_PANEL_BACKGROUND_COLOR: new Color( 239, 239, 195 ),
    GRID_PANEL_STROKE_COLOR: new Color( 100, 100, 100 ),
    PANEL_TITLE_FONT: new SimFont( { family: 'Futura', size: 18, weight: 'bold' } ),
    ANIMATION_VELOCITY: 500,
    PLAY_STEP_DISTANCE:  imageNode.width / 2,
    ORGANISM_RADIUS:     imageNode.width / 2,
    MOVE_APART_DISTANCE: imageNode.width / 4,
    MIN_REPRODUCTION_LAPSE: 15,
    MIN_PREDATE_LAPSE: 5,
    IMAGE_SCALE: IMAGE_SCALE,
    GRID_NODE_DIMENSION: new Dimension2( 930, 360 ),
    CHART_NODE_DIMENSION: new Dimension2( 350, 200 ),
    ORGANISM_PANEL_DIMENSION: new Dimension2( 300, 180 ),
    PARTICLE_COLOR: new Color( 255, 0, 0 ),
    MAX_ORGANISMS: 60,
    MAX_RIPPLE_FRAMES: 75,
    RAIN_DROP_COUNT: 10,
    MAX_PLAY_TIME: 100,

// interaction states
    DYING_STATE: 1,
    EATING_STATE: 2,
    REPRODUCING_STATE: 3,
    BEING_PRODUCED_STATE: 4,
    NON_INTERACTION_STATE: 0


  }
  ;


module.exports = EcoSystemConstants;