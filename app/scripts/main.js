/**
 * Main entry point for the app.
 *
 * @author Sharfudeen Ashraf
 */

//constants
var ASSERT = true; // ASSET slows down the code, so use nly for debugging

var SimLauncher = require('./core/SimLauncher');
var SimApp = require('./core/SimApp');
var SimScreen = require('./core/Screen');
var EcoSystemModel = require('./model/EcoSystemModel');
var EcoSystemView = require('./view/EcoSystemView');
var OrganismImageCollection = require('./model/organisms/OrganismImageCollection');
var energySimTitle = "EcoSystem Simulation";

var SECS_DEFERED = 1000;
var ecoSystemView = null;

var SimLaunchAdapter = {

    launchByURL: function (url, sceneId, options) {
        options = _.extend({
                tx: 0, ty: 0, scale: 1, transformOrder: 1
            }, options
        );
        var self = this;
        SimLauncher.launch(function (organismsInfo) {
            setTimeout(function () {
                OrganismImageCollection.loadImages();
                self.startApp(organismsInfo, sceneId, options);
            }, SECS_DEFERED);

        }, url);
    },

    startApp: function (organismsInfo, sceneId, options) {
        var createModel = function () {
            return new EcoSystemModel(organismsInfo);
        };

        var createView = function (model) {
            ecoSystemView = new EcoSystemView(model, options); // store it globally
            return ecoSystemView;
        };

        var energySimScreen = new SimScreen(energySimTitle, createModel, createView);
        var app = new SimApp(energySimTitle, energySimScreen, sceneId, options);
        //start rendering..


        app.start();
    },

    /**
     *
     * @param organismsInfo
     * @param sceneId
     * @param options // backgroundColor: 'rgb( 242, 255, 204 )',screenWidth:1024,screenHeight:768
     */
    launchUsingData: function (organismsInfo, sceneId, options) {
        var self = this;
        options = _.extend({
                tx: 0, ty: 0, scale: 0.8, transformOrder: 1
            }, options
        );

        setTimeout(function () {
            OrganismImageCollection.loadImages();
            self.startApp(organismsInfo, sceneId, options);
        }, SECS_DEFERED);

    },

    getReplayData: function () {
        return ecoSystemView.getReplayData();
    },

    replay: function (prevStateJSON) {
       ecoSystemView.replay(prevStateJSON);
    }

};

window.EcoSystemLauncher = SimLaunchAdapter;
