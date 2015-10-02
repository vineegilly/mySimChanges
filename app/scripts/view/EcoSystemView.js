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
var PopulationChartNode = require( './PopulationChartNode' );
var Text = scenery.Text;
var HBox = scenery.HBox;
var Path = scenery.Path;
var Shape = kite.Shape;
var Color = scenery.Color;
var EcoSystemConstants = require( '../model/EcoSystemConstants' );


// private constants
var GRID_PANEL_OFFSET_X = 50;
var GRID_PANEL_OFFSET_Y = 70;
var PANEL_VERTICAL_PADDING = 25;


function EcoSystemView( ecoSystemModel ) {
  var thisView = this;
  BaseScreenView.call( thisView, { layoutBounds: new Bounds2( 0, 0, 1024, 704 ) } );

  var viewBoundsPath = new Path( Shape.bounds( this.layoutBounds ), { pickable: false, stroke: 'red', lineWidth: 0, fill: '#87cefa' } );
  thisView.addChild( viewBoundsPath );


  thisView.gridPanelNode = new GridPanelNode( ecoSystemModel );
  thisView.gridPanelNode.x = thisView.layoutBounds.x + GRID_PANEL_OFFSET_X;
  thisView.gridPanelNode.y = thisView.layoutBounds.y + GRID_PANEL_OFFSET_Y;

  var gridSize = EcoSystemConstants.GRID_NODE_DIMENSION;
  var motionBounds = Bounds2.rect( EcoSystemConstants.ORGANISM_RADIUS, EcoSystemConstants.ORGANISM_RADIUS, gridSize.width - EcoSystemConstants.ORGANISM_RADIUS * 3, gridSize.height - EcoSystemConstants.ORGANISM_RADIUS * 2 );

  function handleOrganismAdded( addedOrganismModel ) {
    // Add a representation of the number.
    var organismNode = new OrganismNode( addedOrganismModel );
    thisView.gridPanelNode.addOrganism( organismNode );

    // Move the shape to the front of this layer when grabbed by the user.
    addedOrganismModel.userControlledProperty.link( function( userControlled ) {
      if ( userControlled ) {
        organismNode.moveToFront();
      }
    } );

    ecoSystemModel.residentOrganismModels.addItemRemovedListener( function removalListener( removedOrganismModel ) {
      if ( removedOrganismModel === addedOrganismModel ) {
        thisView.gridPanelNode.removeOrganism( organismNode );
        ecoSystemModel.residentOrganismModels.removeItemRemovedListener( removalListener );
      }
    } );
  }

  //Initial Organism Creation
  ecoSystemModel.residentOrganismModels.forEach( handleOrganismAdded );

  // Observe new items
  ecoSystemModel.residentOrganismModels.addItemAddedListener( handleOrganismAdded );
  var organismPanelNode = new OrganismPanelNode( ecoSystemModel, thisView.gridPanelNode, motionBounds );
  var environmentControlsNode = new EnvironmentControlsNode( ecoSystemModel );

  thisView.populationChartNode = new PopulationChartNode();

  var panelBox = new HBox( {
    children: [ organismPanelNode, environmentControlsNode, thisView.populationChartNode ],
    spacing: 20,
    align: 'center'
  } );

  thisView.addChild( panelBox );
  panelBox.x = thisView.gridPanelNode.bounds.left;
  panelBox.y = thisView.gridPanelNode.bounds.bottom + PANEL_VERTICAL_PADDING;
  thisView.addChild( thisView.gridPanelNode );


  /*  playerPanel.x = thisView.gridPanelNode.bounds.centerX - playerPanel.bounds.width / 2;
   playerPanel.y = thisView.gridPanelNode.bounds.bottom - playerPanel.bounds.height; */

}

inherit( BaseScreenView, EcoSystemView, {
  /**
   * view related animation
   * @param dt
   */
  step: function( dt ) {
    var thisView = this;
    thisView.gridPanelNode.step( dt );

  }
} );


module.exports = EcoSystemView;