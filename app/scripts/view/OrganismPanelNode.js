var inherit = axon.inherit;
var Dimension2 = dot.Dimension2;
var Panel = require('../controls/Panel');
var TitleBarNode = require('./TitleBarNode');
var EcoSystemConstants = require('../model/EcoSystemConstants');
var Node = scenery.Node;
var VBox = scenery.VBox;
var OrganismModelFactory = require('../model/organisms/OrganismModelFactory');
var OrganismCreatorNode = require('./OrganismCreatorNode');
var SimFont = require('../core/SimFont');
var CheckBox = require('../controls/CheckBox');
var HSlider = require('../controls/HSlider');
var Text = scenery.Text;
var HBox = scenery.HBox;
var PlayerBox = require('./PlayerBox');

var GridLayout = require('../util/GridLayout');

// constants
var ORGANISMS_STR = "Organisms";
var CHECK_BOX_OPTIONS = {boxWidth: 30};
var CONTROL_TEXT_OPTIONS = {font: new SimFont(15)};
var POPULATION_TEXT_OPTIONS = {font: new SimFont(25)};
var POPULATION_RANGE_STR = "Population Range";
var RAIN_STR = "Rain";
var PESTICIDE_STR = "PESTICIDE";
var TITLE_SIZE = new Dimension2(200, 30);


/**
 *
 * @param {EcoSystemModel} ecoSystemModel
 * @param {GridPanelNode} gridPaneNode
 * @param {PopulationChartNode} populationChartNode
 * @param {Bounds2} motionBounds
 * @constructor
 */
function OrganismPanelNode(ecoSystemModel, gridPaneNode, populationChartNode, motionBounds) {
    var thisPanel = this;

    var creatorCallBack = function (organismInfo, pos) {
        var organismModel = OrganismModelFactory.getOrganism(ecoSystemModel, organismInfo, pos, motionBounds);
        ecoSystemModel.addOrganism(organismModel);
        return organismModel;
    };

    var canPlaceShapeCallBack = function (organismModel, droppedPoint) {
        if (gridPaneNode.isInside(droppedPoint)) {
            return true;
        }
        return false;
    };

    var organismInfos = ecoSystemModel.organismInfos;

    var organismsCreators = [];

    organismInfos.forEach(function (organismInfo) {
        var organismCreatorNode = new OrganismCreatorNode(organismInfo, gridPaneNode,
            creatorCallBack, canPlaceShapeCallBack);
        organismsCreators.push(organismCreatorNode);
    });


    //create a empty object, the layout will assign the right x and y values
    var rectElements = organismInfos.map(function () {
        return {};
    });

    var appearanceLayerNode = new Node();

    var gridLayout = GridLayout();
    gridLayout
        .size([EcoSystemConstants.ORGANISM_PANEL_DIMENSION.width,
            EcoSystemConstants.ORGANISM_PANEL_DIMENSION.height])
        .bands()
        .padding([0.05, 0.05]);

    gridLayout(rectElements);


    for (var i = 0; i < rectElements.length; i++) {
        var rectElement = rectElements[i];
        var creatorNode = organismsCreators[i];
        creatorNode.x = rectElement.x;
        creatorNode.y = rectElement.y;
        appearanceLayerNode.addChild(creatorNode);
    }

    var titleBarNode = new TitleBarNode(TITLE_SIZE, ORGANISMS_STR);
    var rainProperty = ecoSystemModel.rainProperty;
    var populationRangeProperty = ecoSystemModel.populationRangeProperty;
    var populationRangeSlider = new HSlider(populationRangeProperty, {min: 1, max: 5});

    var populationRangeIndicator = new Text(populationRangeProperty.get(), POPULATION_TEXT_OPTIONS);
    var populationSliderBox = new HBox({
        spacing: 15,
        children: [populationRangeSlider, populationRangeIndicator],
        resize: false
    });

    populationRangeProperty.link(function (populationRangeValue) {
        populationRangeIndicator.text = Number(populationRangeValue) | 0;
    });


    var checkBoxes = [];
    var rainCheckBoxControl = new CheckBox(new Text(RAIN_STR, CONTROL_TEXT_OPTIONS),
        rainProperty, CHECK_BOX_OPTIONS);
    /* var pesticideBoxControl = new CheckBox( new Text( PESTICIDE_STR, CONTROL_TEXT_OPTIONS ),
     pesticideSprayProperty, CHECK_BOX_OPTIONS );*/
    checkBoxes.push(rainCheckBoxControl);
//  checkBoxes.push( pesticideBoxControl );
    var checkBoxControlBox = new HBox({
        children: checkBoxes,
        spacing: 20
    });

    ecoSystemModel.playPauseProperty.link(function (playPause) {
        populationRangeSlider.enabled = !playPause;

    });


    var playerBox = new PlayerBox(ecoSystemModel.playPauseProperty, function () {
        populationChartNode.clearChart();
        ecoSystemModel.onClearPlay();
        populationRangeProperty.set(1);
    });


    var panelContents = new VBox({
        children: [titleBarNode, appearanceLayerNode, populationSliderBox, checkBoxControlBox, playerBox],
        spacing: 18,
        resize: false
    });


    // vertical panel
    Panel.call(thisPanel, panelContents, {
        // panel options
        fill: EcoSystemConstants.GRID_BACKGROUND_COLOR,
        resize: false,
        yMargin: 5,
        cornerRadius: 0
    });


}

inherit(Panel, OrganismPanelNode, {});

module.exports = OrganismPanelNode;