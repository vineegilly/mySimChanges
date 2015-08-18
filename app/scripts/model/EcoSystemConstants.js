var Color = scenery.Color;
var SimFont = require( '../core/SimFont' );


var EcoSystemConstants = {

  GRID_BACKGROUND_COLOR: new Color( 255, 255, 255 ),
  ORGANISM_BACKGROUND_COLOR: new Color( 120, 125, 200 ),
  PLAYER_PANEL_BACKGROUND_COLOR: new Color( 239, 239, 195 ),
  GRID_PANEL_STROKE_COLOR: new Color( 100, 100, 100 ),
  PANEL_TITLE_FONT: new SimFont( { family: 'Futura', size: 18, weight: 'bold' } ),
  ANIMATION_VELOCITY: 500,
  PLAY_STEP_DISTANCE: 60

};


module.exports = EcoSystemConstants;