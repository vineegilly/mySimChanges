/**
 * The main model containing - EcoSystem
 * @author Sharfudeen Ashraf
 *
 */

var inherit = axon.inherit;
var Bounds2 = dot.Bounds2;
var BaseScreenView = require('../core/BaseScreenView');
var GridPanelNode = require('./GridPanelNode');
var OrganismNode = require('./OrganismNode');
var OrganismPanelNode = require('./OrganismPanelNode');
var PopulationChartNode = require('./PopulationChartNode');
var Text = scenery.Text;
var HBox = scenery.HBox;
var Path = scenery.Path;
var Shape = kite.Shape;
var Color = scenery.Color;
var Node = scenery.Node;
var Vector2 = dot.Vector2;
var EcoSystemConstants = require('../model/EcoSystemConstants');


// private constants
var GRID_PANEL_OFFSET_X = 50;
var GRID_PANEL_OFFSET_Y = 70;
var CHART_PANEL_TOP_OFFSET = 20;
var PANEL_VERTICAL_PADDING = 25;


function EcoSystemView(ecoSystemModel, options) {
    var thisView = this;
    thisView.model = ecoSystemModel;
    BaseScreenView.call(thisView, {
        layoutBounds: new Bounds2(0, 0, 1024, 704)
    });


    var viewBoundsPath = new Path(Shape.bounds(this.layoutBounds), {
        pickable: false,
        lineWidth: 0

    });
    thisView.addChild(viewBoundsPath);

    var viewWrapper = new Node();

    thisView.addChild(viewWrapper);


    thisView.gridPanelNode = new GridPanelNode(ecoSystemModel);
    thisView.gridPanelNode.x = thisView.layoutBounds.x + GRID_PANEL_OFFSET_X;
    thisView.gridPanelNode.y = thisView.layoutBounds.y + GRID_PANEL_OFFSET_Y;

    var gridSize = EcoSystemConstants.GRID_NODE_DIMENSION;
    var motionBounds = Bounds2.rect(EcoSystemConstants.ORGANISM_RADIUS, EcoSystemConstants.ORGANISM_RADIUS, gridSize.width - EcoSystemConstants.ORGANISM_RADIUS * 3,
        gridSize.height - EcoSystemConstants.ORGANISM_RADIUS * 2);

    EcoSystemConstants.MOTION_BOUNDS = motionBounds;

    function handleOrganismAdded(addedOrganismModel) {
        // Add a representation of the number.
        var organismNode = new OrganismNode(addedOrganismModel);
        thisView.gridPanelNode.addOrganism(organismNode);

        // Move the shape to the front of this layer when grabbed by the user.
        addedOrganismModel.userControlledProperty.link(function (userControlled) {
            if (userControlled) {
                organismNode.moveToFront();
            }
        });

        ecoSystemModel.residentOrganismModels.addItemRemovedListener(function removalListener(removedOrganismModel) {
            if (removedOrganismModel === addedOrganismModel) {
                thisView.gridPanelNode.removeOrganism(organismNode);
                ecoSystemModel.residentOrganismModels.removeItemRemovedListener(removalListener);
            }
        });
    }

    //Initial Organism Creation
    ecoSystemModel.residentOrganismModels.forEach(handleOrganismAdded);

    thisView.populationChartNode = new PopulationChartNode();

    // Observe new items
    ecoSystemModel.residentOrganismModels.addItemAddedListener(handleOrganismAdded);
    var organismPanelNode = new OrganismPanelNode(ecoSystemModel, thisView.gridPanelNode, thisView.populationChartNode, motionBounds);


    viewWrapper.addChild(organismPanelNode);
    viewWrapper.addChild(thisView.populationChartNode);

    organismPanelNode.x = thisView.gridPanelNode.bounds.left;
    thisView.populationChartNode.x = organismPanelNode.x + organismPanelNode.bounds.width + 5;

    organismPanelNode.y = thisView.gridPanelNode.bounds.bottom + PANEL_VERTICAL_PADDING;
    thisView.populationChartNode.y = thisView.gridPanelNode.y + CHART_PANEL_TOP_OFFSET;
    //;thisView.gridPanelNode.bounds.bottom + PANEL_VERTICAL_PADDING;

    viewWrapper.addChild(thisView.gridPanelNode);


    if (options.transformOrder === 1) {
        viewWrapper.translate(options.tx || 0, options.ty || 0);
        viewWrapper.scale(options.scale || 1);
    }
    else {
        viewWrapper.scale(options.scale || 1);
        viewWrapper.translate(options.tx || 0, options.ty || 0);
    }


}

inherit(BaseScreenView, EcoSystemView, {
    /**
     * view related animation
     * @param dt
     */
    step: function (dt) {
        var thisView = this;
        if (thisView.model.replayMode) {
            thisView.populationChartNode.updateChart(thisView.model.organismLifeLineSnapShots);
            return;
        }

        thisView.gridPanelNode.step(dt);
        if (thisView.model.isPlaying()) {
            thisView.populationChartNode.updateChart(thisView.model.organismLifeLineSnapShots);
        }
    },

    replay: function (prevReplayState) {
        var thisView = this;
        thisView.model.replay(prevReplayState);
    }
});


module.exports = EcoSystemView;