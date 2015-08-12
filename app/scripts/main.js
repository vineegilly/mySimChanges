function SceneryBootStrap() {

  // Create a scene graph over the block-level element. Everything inside is replaced
  var scene = new scenery.Node();

  debugger;
  var display = new scenery.Display( scene, {
    container: document.getElementById( 'example-scene' )
  } );

  /*---------------------------------------------------------------------------*
   * Built-in shapes
   *----------------------------------------------------------------------------*/

  // circle
  scene.addChild( new scenery.Path( kite.Shape.circle( 50, 50, 40 ), {// center X, center Y, radius
    fill: '#0ff',
    stroke: '#000'
  } ) );

  // circle
  scene.addChild( new scenery.Path( kite.Shape.circle( 150, 50, 40 ), {// center X, center Y, radius
    fill: '#0ff',
    stroke: '#000'
  } ) );

  // regular polygon
  scene.addChild( new scenery.Path( kite.Shape.regularPolygon( 6, 22 ), { // sides, radius
    fill: '#00f',
    stroke: '#000',
    x: 150,
    y: 50
  } ) );

  // Paint any changes
  display.updateDisplay();

};


SceneryBootStrap();
