var inherit = axon.inherit;
var SimFont = require( '../core/SimFont' );
var Panel = require( '../controls/Panel' );
var Node = scenery.Node;
var Text = scenery.Text;
var VBox = scenery.VBox;
var OrganismModelFactory = require( '../model/organisms/OrganismModelFactory' );
var OrganismImageCollection = require( '../model/organisms/OrganismImageCollection' );
var OrganismCreatorNode = require( './OrganismCreatorNode' );
var EcoSystemConstants = require( '../model/EcoSystemConstants' );

/**
 *
 * @param ecoSystemModel
 * @param organismModels
 * @param screenView
 * @param gridNode
 * @constructor
 */
function OrganismPanelNode( ecoSystemModel, organismModels, screenView, gridNode ) {
  var thisPanel = this;
  var appearanceLayerNode = new Node();

  var creatorCallBack = function( type, appearanceImage, pos ) {
    var organismModel = OrganismModelFactory.getOrganism( type, appearanceImage, pos );
    ecoSystemModel.addOrganism( organismModel );
    return organismModel;
  };

  var canPlaceShapeCallBack = function() {
    return true;
  };

  var carnivoresImage = OrganismImageCollection.getRepresentation( OrganismImageCollection.CARNIVORES );
  var organismCreatorNode = new OrganismCreatorNode( OrganismImageCollection.CARNIVORES,gridNode,
    carnivoresImage, screenView, creatorCallBack, canPlaceShapeCallBack );

  appearanceLayerNode.addChild( organismCreatorNode );

  var panelChildren = [ appearanceLayerNode ];
  // vertical panel
  Panel.call( thisPanel, new VBox( {
    children: panelChildren,
    align: 'left',
    spacing: 7
  } ), {
    // panel options
    fill: EcoSystemConstants.GRID_BACKGROUND_COLOR

  } );

}

inherit( Panel, OrganismPanelNode, {} );

module.exports = OrganismPanelNode;