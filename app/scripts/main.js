/**
 * Main entry point for the app.
 *
 * @author Sharfudeen Ashraf
 */

//constants
var ASSERT = true; // ASSET slows down the code, so use nly for debugging

var SimLauncher = require( './core/SimLauncher' );
var SimApp = require( './core/SimApp' );
var SimScreen = require( './core/Screen' );
var EcoSystemModel = require( './model/EcoSystemModel' );
var EcoSystemView = require( './view/EcoSystemView' );
var energySimTitle = "EcoSystem Simulation";

var SimLaunchAdapter = {

  launchByURL: function( url ) {
    var self = this;
    SimLauncher.launch( function( organismsInfo ) {
      self.startApp( organismsInfo );
    }, url );
  },

  startApp: function( organismsInfo ) {
    var options = { backgroundColor: 'rgb( 242, 255, 204 )' /* Light yellow-green */ };
    var createModel = function() {
      return new EcoSystemModel( organismsInfo );
    };

    var createView = function( model ) {
      return new EcoSystemView( model );
    };

    var energySimScreen = new SimScreen( energySimTitle, createModel, createView );
    var app = new SimApp( energySimTitle, energySimScreen, '"main-scene', options );
    //start rendering..
    app.start();
  },

  launchUsingData: function( organismsInfo ) {
    var self = this;
    self.startApp( organismsInfo );
  }

};

window.EcoSystemLauncher = SimLaunchAdapter;




