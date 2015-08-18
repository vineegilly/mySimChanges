/**
 * The main model containing - EcoSystem
 * @author Sharfudeen Ashraf
 *
 */

var inherit = axon.inherit;
var Bounds2 = dot.Bounds2;
var BaseScreenView = require( '../core/BaseScreenView' );
var GridPanelNode = require( './GridPanelNode' );
var OrganismNode = require( './OrganismNode' );
var OrganismPanelNode = require( './OrganismPanelNode' );
var EnvironmentControlsNode = require( './EnvironmentControlsNode' );
var PlayerPanel = require( './PlayerPanel' );
var SimFont = require( '../core/SimFont' );
var Text = scenery.Text;
var HBox = scenery.HBox;

var OrganismModelFactory = require( '../model/organisms/OrganismModelFactory' );

// private constants
var GRID_PANEL_OFFSET_X = 50;
var GRID_PANEL_OFFSET_Y = 70;
var PANEL_VERTICAL_PADDING = 25;


function EcoSystemView( ecoSystemModel ) {
  var thisView = this;
  BaseScreenView.call( thisView, { layoutBounds: new Bounds2( 0, 0, 1024, 704 ) } );

  var gridPanelNode = new GridPanelNode();
  gridPanelNode.x = thisView.layoutBounds.x + GRID_PANEL_OFFSET_X;
  gridPanelNode.y = thisView.layoutBounds.y + GRID_PANEL_OFFSET_Y;

  function handleOrganismAdded( addedOrganismModel ) {
    // Add a representation of the number.
    var organismNode = new OrganismNode( addedOrganismModel );
    gridPanelNode.addOrganism( organismNode );

    // Move the shape to the front of this layer when grabbed by the user.
    addedOrganismModel.userControlledProperty.link( function( userControlled ) {
      if ( userControlled ) {
        organismNode.moveToFront();
      }
    } );

    ecoSystemModel.residentOrganismModels.addItemRemovedListener( function removalListener( removedOrganismModel ) {
      if ( removedOrganismModel === addedOrganismModel ) {
        gridPanelNode.removeOrganism( organismNode );
        ecoSystemModel.residentOrganismModels.removeItemRemovedListener( removalListener );
      }
    } );
  }

  //Initial Organism Creation
  ecoSystemModel.residentOrganismModels.forEach( handleOrganismAdded );

  // Observe new items
  ecoSystemModel.residentOrganismModels.addItemAddedListener( handleOrganismAdded );
  var organismPanelNode = new OrganismPanelNode( ecoSystemModel, gridPanelNode );
  var environmentControlsNode = new EnvironmentControlsNode();

  var panelBox = new HBox( {
    children: [ organismPanelNode, environmentControlsNode ],
    spacing: 20,
    align: 'center'
  } );

  thisView.addChild( panelBox );
  panelBox.x = gridPanelNode.bounds.left;
  panelBox.y = gridPanelNode.bounds.bottom + PANEL_VERTICAL_PADDING;
  thisView.addChild( gridPanelNode );


  var playerPanel = new PlayerPanel( ecoSystemModel.playPauseProperty, ecoSystemModel.onClearPlay.bind( ecoSystemModel ) );
  thisView.addChild( playerPanel );
  playerPanel.x = gridPanelNode.bounds.centerX - playerPanel.bounds.width / 2;
  playerPanel.y = gridPanelNode.bounds.bottom - playerPanel.bounds.height;


  /*  var image1 = new scenery.Image( CARNIVORES_IMAGE );
   thisView.addChild( image1 );

   var property = new Property( 130 );

   var slider = new HSlider( property, { min: 100, max: 150 } );

   var checkBoxControl = new CheckBox( new Text( testString, TEXT_OPTIONS ), property, CHECK_BOX_OPTIONS );
   thisView.addChild( checkBoxControl );

   checkBoxControl.x = thisView.layoutBounds.center.x;
   checkBoxControl.y = thisView.layoutBounds.center.y;

   // circle
   thisView.addChild( new scenery.Path( kite.Shape.circle( 50, 50, 40 ), {// center X, center Y, radius
   fill: '#0ff',
   stroke: '#000'
   } ) );


   // add a drag handler to each node
   image1.addInputListener( new SimpleDragHandler( {
   // allow moving a pointer (touch) across a node to pick it up
   allowTouchSnag: true,

   translate: function( translationParams ) {
   var thisHandler = this;
   // How far it has moved from the original position
   var delta = translationParams.delta;
   image1.leftTop = image1.leftTop.plus( delta );

   }
   } ) ); */

}

inherit( BaseScreenView, EcoSystemView, {
  /**
   * view related animation
   * @param dt
   */
  step: function( dt ) {

  }
} );


module.exports = EcoSystemView;