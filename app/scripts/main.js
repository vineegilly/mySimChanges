/**
 * Main entry point for the app.
 *
 * @author Sharfudeen Ashraf
 */
define( function( require ) {
  'use strict';
  var SimLauncher = require( './core/SimLauncher' );
  var SimApp = require( './core/SimApp' );
  var SimScreen = require( './core/Screen' );

  var EcoSystemModel = require( './model/EcoSystemModel' );
  var EcoSystemView = require( './view/EcoSystemView' );

  var energySimTitle = "EcoSystem Simulation";
  SimLauncher.launch( function() {
    var options = { backgroundColor: 'rgb( 242, 255, 204 )' /* Light yellow-green */ };
    var createModel = function() {
      return new EcoSystemModel();
    };

    var createView = function( model ) {
      return new EcoSystemView( model );
    };

    var energySimScreen = new SimScreen( energySimTitle, createModel, createView );
    var app = new SimApp( energySimTitle, energySimScreen, '"main-scene', options );
    //start rendering..
    app.start();
  } );


} );


