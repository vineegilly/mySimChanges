var inherit = axon.inherit;
var DOM = scenery.DOM;
var Node = scenery.Node;
var Panel = require('../controls/Panel');
var EcoSystemConstants = require('../model/EcoSystemConstants');
var d3 = require('d3');
var OrganismRuleConstants = require('../model/OrganismRuleConstants');
var ChartLegend = require('./ChartLegend');

// constants
var POPULATION_CHART_ID = "populationChartDiv";
var MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
};

var CHART_WIDTH = EcoSystemConstants.CHART_NODE_DIMENSION.width;
var CHART_HEIGHT = EcoSystemConstants.CHART_NODE_DIMENSION.height;


function PopulationChartNode() {
    var thisPanel = this;
    // vertical panel
    Node.call(thisPanel);

    function deferedInitialization() {

        var element = document.createElement('div');
        $(element).attr('id', POPULATION_CHART_ID);

        element.style.width = EcoSystemConstants.CHART_NODE_DIMENSION.width;
        element.style.height = EcoSystemConstants.CHART_NODE_DIMENSION.height;
        var domContent = new DOM(element);
        var populationChartDiv = d3.select(element);

        thisPanel.svgSelection = populationChartDiv.append("svg")
            .attr("width", CHART_WIDTH)
            .attr("height", CHART_HEIGHT);

        thisPanel.buildChart();

        thisPanel.addChild(domContent);
        thisPanel.prevCollectionCount = 0;
    }


    setTimeout(deferedInitialization, 2000);


}

inherit(Node, PopulationChartNode, {

    buildChart: function () {
        var self = this;
        var svgSelection = this.svgSelection;
        this.xScale = d3.scale.linear()
            .range([MARGINS.left, CHART_WIDTH - MARGINS.right])
            .domain([0, EcoSystemConstants.TOTAL_LIFE_SPAN]);

        // number of organisms
        this.yScale = d3.scale.linear().range([CHART_HEIGHT - MARGINS.top, MARGINS.bottom])
            .domain([0, EcoSystemConstants.MAX_ORGANISMS]);

        var xAxis = d3.svg.axis()
            .scale(this.xScale)
            .ticks(12)
            .tickFormat(function (d) {
                if (d === 0) {
                    return "";
                }
                return d / 1000;
            });

        var yAxis = d3.svg.axis()
            .scale(this.yScale)
            .orient("left")
            .ticks(5);

        svgSelection.append("svg:g")
            .attr("transform", "translate(-5," + (CHART_HEIGHT - MARGINS.bottom) + ")")
            .call(xAxis);

        svgSelection.append("svg:g")
            .attr("transform", "translate(" + (MARGINS.left) + ",0)")
            .call(yAxis);

        this.organismLifeLine = d3.svg.line().interpolate("basis")
            .x(function (d) {
                return self.xScale(d.time)
            })
            .y(function (d) {
                return self.yScale(d.count)
            });

        this.legend = svgSelection.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(250,30)")
            .style("font-size", "12px")
            .style("font-size", "20px")
            .attr("data-style-padding", 10);
    },

    //private
    drawLegends: function () {
        this.legend.call(d3.legend);
    },

    /**
     *
     * @param organismSnapShotCollection
     */
    updateChart: function (organismSnapShotCollection) {
        if (this.prevCollectionCount === organismSnapShotCollection.length) {
            return;
        }


        var self = this;
        var groupedElements = _.groupBy(organismSnapShotCollection, function (organismSnapShot) {
            return organismSnapShot.name;
        });
        var data = [];
        _.each(groupedElements, function (organismSnapShots, name) {
            data.push({name: name, points: organismSnapShots});
        });

        var svgSelection = this.svgSelection;

        // draw the lines
        var lines = svgSelection.selectAll(".line").data(data).attr("class", "line");

// transition from previous paths to new paths
        lines.transition().duration(EcoSystemConstants.SNAPSHOT_CAPTURE_ELAPSE)
            .attr("d", function (d) {
                return self.organismLifeLine(d.points);
            })
            .attr("fill", "none")
            .attr("stroke", function (d) {
                return OrganismRuleConstants[d.name].color;
            })
            .attr("stroke-width", 2);


// enter any new lines
        lines.enter()
            .append("path")
            .attr("class", "line")
            .attr("data-legend", function (d) {
                return d.name
            })
            .attr("d", function (d) {
                return self.organismLifeLine(d.points);
            })
            .attr("stroke", function (d) {
                return OrganismRuleConstants[d.name].color;
            });

// exit
        lines.exit().remove();

        this.prevCollectionCount = organismSnapShotCollection.length;

        this.drawLegends();

    },

    clearChart: function () {
        this.svgSelection.selectAll(".line").remove();
    }


});

module.exports = PopulationChartNode;

