/**
 * The main model containing - EcoSystem
 * @author Sharfudeen Ashraf
 *
 */

// modules
var inherit = axon.inherit;
var PropertySet = axon.PropertySet;
var Property = axon.Property;
var ObservableArray = axon.ObservableArray;
var OverlapRulesFactory = require('../model/organisms/OverlapRulesFactory');
var EcoSystemConstants = require('./EcoSystemConstants');
var OrganismModelFactory = require('../model/organisms/OrganismModelFactory');
var OrganismLifeLineSnapShot = require('../model/organisms/OrganismLifeLineSnapShot');
var Bounds2 = dot.Bounds2;
var Vector2 = dot.Vector2;

/**
 *
 * @param organismInfos
 * @param screenBounds
 * @param replayMode
 * @constructor
 */
function EcoSystemModel(organismInfos, screenBounds) {
    var thisModel = this;
    PropertySet.call(this, {
        playPause: false,
        populationRange: 1,
        rain: false,
        poisonSpray: false,
        replayMode: false
    });

    this.organismInfos = organismInfos;


    organismInfos.forEach(function (organismInfo) {
        thisModel[organismInfo.name.toLowerCase() + "Quantity"] = new Property(0);// set default to zero
    });


    this.screenBounds = screenBounds;

    // Observable array of the organisms that have been placed on grid
    this.residentOrganismModels = new ObservableArray();

    this.dyingModels = new ObservableArray();
    this.newlyReproducedModels = new ObservableArray();
    this.organismLifeLineSnapShots = [];
    this.snapShotCounter = -1;
    this.totalTimeLapse = 0; // in milli seconds
    this.totalLifeSpan = EcoSystemConstants.TOTAL_LIFE_SPAN;

    thisModel.replayState = {
        graphStateList: [],
        organismState: []
    };

    thisModel.currentReplayCounter = 0;

    this.playPauseProperty.link(function (playPause) {
        if (playPause) {
            thisModel.play();
        }
        else {
            thisModel.pause();
        }
    });

    this.rainProperty.link(function (rain) {
        if (rain) {
            thisModel.onRain();
        }
    });


    this.poisonSprayProperty.link(function (poisonSpray) {
        if (poisonSpray) {
            thisModel.onPoisonSpray();
        }
    });


}


inherit(PropertySet, EcoSystemModel, {

    replay: function (prevReplayState) {
        var currentReplayState = _.clone(prevReplayState, true);
        this.currentReplayCounter = 0;
        this.startReplayTimeLapse = 0;

        this.replayState = currentReplayState;
        var oldOrganisms = currentReplayState.organismState;
        for (var i = 0; i < oldOrganisms.length; i++) {
            OrganismModelFactory.getOrganism(this, {
                name: oldOrganisms[i].name
            }, new Vector2(oldOrganisms[i].position.x, oldOrganisms[i].position.y), EcoSystemConstants.MOTION_BOUNDS);
        }

        this.organismLifeLineSnapShots = [];
        this.replayMode = true;

    },
    /**
     * model related animation
     * @param dt
     */
    step: function (dt) {

        var self = this;
        if (this.replayMode) {

            var totalTimeLapse = this.replayState.graphStateList[this.currentReplayCounter].totalTimeLapse;
            if (this.startReplayTimeLapse > totalTimeLapse) {
                if (this.currentReplayCounter < this.replayState.graphStateList.length - 1) {
                    var elementGroupCountMap = this.replayState.graphStateList[this.currentReplayCounter].elementGroupCountMap;
                    _.each(elementGroupCountMap, function (elementCount, name) {
                        var organismLifeLineSnapShot = new OrganismLifeLineSnapShot(name, totalTimeLapse, elementCount);
                        self.organismLifeLineSnapShots.push(organismLifeLineSnapShot);
                    });

                    this.currentReplayCounter++;
                }

            }

            this.startReplayTimeLapse += dt * 1000;
            return;
        }

        var self = this;
        this.residentOrganismModels.forEach(function (organismModel) {
            organismModel.step(dt);
        });

        if (this.isPlaying()) {

            var allModels = [].concat(this.residentOrganismModels.getArray());
            for (var i = 0; i < allModels.length; i++) {
                for (var j = 0; j < allModels.length; j++) {
                    OverlapRulesFactory.applyOverlapRules(allModels[i], allModels[j]);
                }
            }
            self.addLifeLineSnapShot(dt);

            if (this.totalTimeLapse > this.totalLifeSpan) {
                this.playPause = false;
            }
        }

    },

    onRain: function () {
        this.residentOrganismModels.forEach(function (organismModel) {
            organismModel.onRain();
        });
    },

    onPoisonSpray: function () {
        this.residentOrganismModels.forEach(function (organismModel) {
            organismModel.onPoisonSpray();
        });
    },

    isSpraying: function () {
        return this.onPoisonSpray;
    },

    isRaining: function () {
        return this.rain;
    },

    /**
     * Store the element name and its count at every step - to reproduce the graph
     * @param dt
     */
    addLifeLineSnapShot: function (dt) {
        var self = this;
        this.totalTimeLapse += dt * 1000;

        var currentCounter = this.totalTimeLapse / EcoSystemConstants.SNAPSHOT_CAPTURE_ELAPSE;

        if (currentCounter > this.snapShotCounter) {
            this.snapShotCounter++;

            var groupedElements = _.groupBy(this.residentOrganismModels.getArray(), function (organismModel) {
                return organismModel.name;
            });

            _.each(groupedElements, function (elementArray, name) {
                var organismLifeLineSnapShot = new OrganismLifeLineSnapShot(name, self.totalTimeLapse, elementArray.length);
                self.organismLifeLineSnapShots.push(organismLifeLineSnapShot);
            });

            var elementGroupCountMap = {};

            _.each(groupedElements, function (elementArray, name) {
                elementGroupCountMap[name] = elementArray.length;
            });

            this.replayState.graphStateList.push({
                elementGroupCountMap: elementGroupCountMap,
                totalTimeLapse: self.totalTimeLapse
            });

        }
    },


    /**
     *
     * @param {OrganismModel} organismModel
     */
    addOrganism: function (organismModel) {
        var self = this;
        this.residentOrganismModels.add(organismModel);

        organismModel.on('returnedToOrigin', function () {
            if (!organismModel.userControlled) {
                // The shape has been returned to the panel.
                self.residentOrganismModels.remove(organismModel);
            }
        });
    },

    reachedLimit: function () {
        if (this.residentOrganismModels.length >= EcoSystemConstants.MAX_ORGANISMS) {
            return true;
        }

        return false;
    },

    /**
     *
     * @param originalOrganism
     * @param initialPos
     * @param state
     * @returns {*}
     */
    cloneOrganism: function (originalOrganism, initialPos, interactionState, createdThroughInteraction) {
        var newOrganismModel = originalOrganism.clone(initialPos, createdThroughInteraction);
        newOrganismModel.interactionState = interactionState;
        this.addOrganism(newOrganismModel);
        return newOrganismModel;
    },

    removeOrganism: function (organismModel) {
        this.residentOrganismModels.remove(organismModel);
    },

    isPlaying: function () {
        return this.playPause === true;
    },

    onClearPlay: function () {
        this.residentOrganismModels.clear();
        this.playPause = false;
        this.resetPlayState();
    },

    resetPlayState: function () {
        this.totalTimeLapse = 0;
        this.snapShotCounter = 0;
        this.organismLifeLineSnapShots = [];
        this.replayMode = false;

        this.replayState.graphStateList = [];
        this.replayState.organismState = [];
    },

    play: function () {
        var self = this;
        this.resetPlayState();
        var gridSize = EcoSystemConstants.GRID_NODE_DIMENSION;
        var motionBounds = Bounds2.rect(EcoSystemConstants.ORGANISM_RADIUS, EcoSystemConstants.ORGANISM_RADIUS,
            gridSize.width - EcoSystemConstants.ORGANISM_RADIUS * 3,
            gridSize.height - EcoSystemConstants.ORGANISM_RADIUS * 2);

        var organismInfos = this.organismInfos;
        organismInfos.forEach(function (organismInfo) {
            var randomPosX = _.random(motionBounds.minX, motionBounds.maxX);
            var randomPosY = _.random(motionBounds.minY, motionBounds.maxY);
            var newPos = motionBounds.closestPointTo(new Vector2(randomPosX, randomPosY));
            var organismModel = OrganismModelFactory.getOrganism(self, organismInfo, newPos, motionBounds);
            self.residentOrganismModels.add(organismModel);
            var quantity = self[organismInfo.name.toLowerCase() + "Quantity"].get();
            organismModel.multiply(quantity);
        });


        this.residentOrganismModels.forEach(function (organismModel) {
            organismModel.play();

            //keep the state
            self.replayState.organismState.push({
                name: organismModel.organismInfo.name,
                position: organismModel.position
            })
        });

    },

    pause: function () {
        this.residentOrganismModels.forEach(function (organismModel) {
            organismModel.pause();
        });
    }
    ,

    addDyingOrganisms: function (organismModel) {
        if (!this.dyingModels.contains(organismModel)) {
            this.dyingModels.add(organismModel);
        }
    }
    ,

    removeDyingOrganisms: function (organismModel) {
        if (this.dyingModels.contains(organismModel)) {
            this.dyingModels.remove(organismModel);
        }
    }
    ,


    addNewlyReproducedOrganism: function (organismModel) {
        if (!this.newlyReproducedModels.contains(organismModel)) {
            this.newlyReproducedModels.add(organismModel);
        }
    }
    ,

    removeNewlyReproducedOrganism: function (organismModel) {
        if (this.newlyReproducedModels.contains(organismModel)) {
            this.newlyReproducedModels.remove(organismModel);
        }
    }
    ,

    /**
     *
     * @returns {Array}
     */
    getSprayableModels: function () {
        var sprayableModels = [];
        this.residentOrganismModels.forEach(function (model) {
            if (model.isSprayApplicable()) {
                sprayableModels.push(model);
            }
        });

        return sprayableModels;
    }

})
;

module.exports = EcoSystemModel;