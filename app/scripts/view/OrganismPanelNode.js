var inherit = axon.inherit;
var Dimension2 = dot.Dimension2;
var Panel = require( '../controls/Panel' );
var TitleBarNode = require( './TitleBarNode' );
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var Node = scenery.Node;
var VBox = scenery.VBox;
var OrganismModelFactory = require( '../model/organisms/OrganismModelFactory' );
var OrganismImageCollection = require( '../model/organisms/OrganismImageCollection' );
var OrganismCreatorNode = require( './OrganismCreatorNode' );

var GridLayout = require( '../util/GridLayout' );

// constants
var PANEL_SIZE = new Dimension2( 300, 180 );
var TITLE_SIZE = new Dimension2( 305, 30 );
var ORGANISMS_STR = "Organisms";


/**
 *
 * @param {EcoSystemModel} ecoSystemModel
 * @param {GridPanelNode} gridPaneNode
 * @param {Bounds2} motionBounds
 * @constructor
 */
function OrganismPanelNode( ecoSystemModel, gridPaneNode, motionBounds ) {
  var thisPanel = this;

  var creatorCallBack = function( type, appearanceImage, pos ) {
    var organismModel = OrganismModelFactory.getOrganism( ecoSystemModel, type, appearanceImage, pos, motionBounds );
    ecoSystemModel.addOrganism( organismModel );
    return organismModel;
  };

  var canPlaceShapeCallBack = function( organismModel, droppedPoint ) {
    if ( gridPaneNode.isInside( droppedPoint ) ) {
      return true;
    }
    return false;
  };

  var gridLayout = GridLayout();
  gridLayout
    .size( [ PANEL_SIZE.width, PANEL_SIZE.height ] )
    .bands()
    .padding( [ 0.1, 0.1 ] );

  var organismInfos = ecoSystemModel.selectedOrganisms;

  var organismsCreators = [];

  organismInfos.forEach( function( organismInfo ) {
    var organismImage = organismInfo.appearanceImage;
    var organismCreatorNode = new OrganismCreatorNode( organismInfo.type, gridPaneNode,
      organismImage, creatorCallBack, canPlaceShapeCallBack );
    organismsCreators.push( organismCreatorNode );
  } );

  var rectElements = organismInfos.map( function() {
    return {};
  } );

  gridLayout( rectElements );

  var appearanceLayerNode = new Node();

  for ( var i = 0; i < rectElements.length; i++ ) {
    var rectElement = rectElements[ i ];
    var creatorNode = organismsCreators[ i ];
    creatorNode.x = rectElement.x;
    creatorNode.y = rectElement.y;
    appearanceLayerNode.addChild( creatorNode );
  }

  var titleBarNode = new TitleBarNode( TITLE_SIZE, ORGANISMS_STR );
  var titleBox = new VBox( {
    align: 'center',
    children: [ titleBarNode, appearanceLayerNode ],
    spacing: 5
  } );


  // vertical panel
  Panel.call( thisPanel, titleBox, {
    // panel options
    fill: EcoSystemConstants.GRID_BACKGROUND_COLOR,
    resize: false,
    yMargin: 5,
    cornerRadius: 0
  } );

}

inherit( Panel, OrganismPanelNode, {} );

module.exports = OrganismPanelNode;