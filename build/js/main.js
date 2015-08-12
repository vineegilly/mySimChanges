/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nfunction SceneryBootStrap() {\n\n  // Create a scene graph over the block-level element. Everything inside is replaced\n  var scene = new scenery.Node();\n\n  debugger;\n  var display = new scenery.Display(scene, {\n    container: document.getElementById(\"example-scene\")\n  });\n\n  /*---------------------------------------------------------------------------*\n   * Built-in shapes\n   *----------------------------------------------------------------------------*/\n\n  // circle\n  scene.addChild(new scenery.Path(kite.Shape.circle(50, 50, 40), { // center X, center Y, radius\n    fill: \"#0ff\",\n    stroke: \"#000\"\n  }));\n\n  // circle\n  scene.addChild(new scenery.Path(kite.Shape.circle(150, 50, 40), { // center X, center Y, radius\n    fill: \"#0ff\",\n    stroke: \"#000\"\n  }));\n\n  // regular polygon\n  scene.addChild(new scenery.Path(kite.Shape.regularPolygon(6, 22), { // sides, radius\n    fill: \"#00f\",\n    stroke: \"#000\",\n    x: 150,\n    y: 50\n  }));\n\n  // Paint any changes\n  display.updateDisplay();\n};\n\nSceneryBootStrap();\n\n/*****************\n ** WEBPACK FOOTER\n ** ./app/scripts/main.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./app/scripts/main.js?");

/***/ }
/******/ ]);