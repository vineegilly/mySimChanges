/**
 * Launches the Simulation , after doing things like showing splash screen,loading images etc
 *
 * @author Sharfudeen Ashraf
 */


module.exports = {
  /**
   * Launch the Sim by preloading the images and calling the callback.
   * @param callback the callback function which should create and start the sim, given that the images are loaded
   */
  launch: function( callback ) {

    //Need to do some preloading ,splash screen etc
    d3.json( 'testdata/organismInfos.json', function( err, organismInfos ) {
      callback( organismInfos.organisms );
    } );

  }

};


