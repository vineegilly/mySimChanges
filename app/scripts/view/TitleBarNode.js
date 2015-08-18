var inherit = axon.inherit;
var Node = scenery.Node;
var Text = scenery.Text;
var Rectangle = scenery.Rectangle;
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var Color = scenery.Color;

/**
 *
 * @param {Dimension2} titleBarSize
 * @param {string} titleStr
 * @param {hash} options
 * @constructor
 */
function TitleBarNode( titleBarSize, titleStr, options ) {

  options = _.extend( {
    xMargin: 1,
    barLineWidth: 0,
    barFill: Color.LIGHT_GRAY,
    barStroke: Color.BLACK
  }, options );

  var titleBarNode = this;
  Node.call( titleBarNode );

  var barNode = new Rectangle( 0, 0, titleBarSize.width, titleBarSize.height, 0, 0, {
    fill: options.barFill,
    stroke: options.barStroke,
    lineWidth: options.barLineWidth
  } );

  // Title
  var titleNode = new Text( titleStr, { font: EcoSystemConstants.PANEL_TITLE_FONT } );

  titleBarNode.addChild( barNode );
  titleBarNode.addChild( titleNode );
  // layout
  titleNode.centerX = barNode.centerX;
  titleNode.centerY = barNode.centerY;
}

inherit( Node, TitleBarNode, {} );
module.exports = TitleBarNode;
