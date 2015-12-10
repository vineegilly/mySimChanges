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
var energySimTitle = "EcoSystem Simulation";

var SimLaunchAdapter = {

    launchByURL: function (url, sceneId, options) {
        options = _.extend({
                screenWidth: 800,
                screenHeight: 600,
                offsetX: 100, offsetY: 200
            }, options
        );
        var self = this;
        SimLauncher.launch(function (organismsInfo) {
            self.startApp(organismsInfo, sceneId, options);
        }, url);
    },

    startApp: function (organismsInfo, sceneId, options) {
        var createModel = function () {
            return new EcoSystemModel(organismsInfo);
        };

        var createView = function (model) {
            return new EcoSystemView(model,options);
        };

        var energySimScreen = new SimScreen(energySimTitle, createModel, createView);
        var app = new SimApp(energySimTitle, energySimScreen, sceneId, options);
        //start rendering..

     //   app.resize(options.screenWidth,options.screenHeight);
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
                screenWidth: 800,
                screenHeight: 600,
                offsetX: 100, offsetY: 100
            }, options
        );

        self.startApp(organismsInfo, sceneId, options);
    }

};

window.EcoSystemLauncher = SimLaunchAdapter;




