/**
 * Main entry point for the app.
 *
 * @author Sharfudeen Ashraf
 */

//constants
var ASSERT = true; // ASSET slows down the code, so use nly for debugging

define( function( require ) {
  'use strict';

  if ( ASSERT ) {

  }

  var SimLauncher = require( './core/SimLauncher' );
  var SimApp = require( './core/SimApp' );
  var SimScreen = require( './core/Screen' );

  var EcoSystemModel = require( './model/EcoSystemModel' );
  var EcoSystemView = require( './view/EcoSystemView' );

  var energySimTitle = "EcoSystem Simulation";
  SimLauncher.launch( function( organismsInfo ) {
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
  } );


} );


