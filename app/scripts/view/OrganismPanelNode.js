var inherit = axon.inherit;
var Dimension2 = dot.Dimension2;
var SimFont = require( '../core/SimFont' );
var Panel = require( '../controls/Panel' );
var Node = scenery.Node;
var Text = scenery.Text;
var VBox = scenery.VBox;
var OrganismModelFactory = require( '../model/organisms/OrganismModelFactory' );
var OrganismImageCollection = require( '../model/organisms/OrganismImageCollection' );
var OrganismCreatorNode = require( './OrganismCreatorNode' );
var EcoSystemConstants = require( '../model/EcoSystemConstants' );
var GridLayout = require( '../util/GridLayout' );

var PANEL_SIZE = new Dimension2( 250, 150 );

/**
 *
 * @param {EcoSystemModel} ecoSystemModel
 * @param organismModels
 * @param {ScreenView} screenView
 * @param gridNode
 * @constructor
 */
function OrganismPanelNode( ecoSystemModel, screenView, gridNode ) {
  var thisPanel = this;

  var creatorCallBack = function( type, appearanceImage, pos ) {
    var organismModel = OrganismModelFactory.getOrganism( type, appearanceImage, pos );
    ecoSystemModel.addOrganism( organismModel );
    return organismModel;
  };

  var canPlaceShapeCallBack = function() {
    return true;
  };


  var gridLayout = GridLayout();
  gridLayout
    .size( [ PANEL_SIZE.width, PANEL_SIZE.height ] )
    .bands()
    .nodeSize( [ 100, 100 ] )
    .padding( [ 15, 15 ] );

  var organismInfos = ecoSystemModel.selectedOrganisms;

  var organismsCreators = [];

  organismInfos.forEach( function( organismInfo ) {
    var organismImage = organismInfo.appearanceImage;
    var organismCreatorNode = new OrganismCreatorNode( organismInfo.type, gridNode,
      organismImage, screenView, creatorCallBack, canPlaceShapeCallBack );
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

  // vertical panel
  Panel.call( thisPanel, appearanceLayerNode, {
    // panel options
    fill: EcoSystemConstants.GRID_BACKGROUND_COLOR,
    resize: false

  } );

}

inherit( Panel, OrganismPanelNode, {} );

module.exports = OrganismPanelNode;