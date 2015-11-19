var webpack = require('webpack');
module.exports.getConfig = function( type ) {

  var isDev = type === 'development';

  var config = {
    entry: isDev?'./app/scripts/main.js':'./build/scripts/main.js',
    output: {
      path: __dirname,
      filename: 'main.js',
      pathinfo: false
    },

    debug: isDev,
    module: {
      loaders: [ {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=100192' }
      ]
    },
    externals: {
      // require("jquery") is external and available
      //  on the global var jQuery
      "jquery": "jQuery",
      "themeMain": "themeMain"

    }
  };

  if ( isDev ) {
    config.devtool = 'eval';
  }

  return config;
};