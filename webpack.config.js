module.exports.getConfig = function( type ) {

  var isDev = type === 'development';

  var config = {
    entry: './app/scripts/main.js',
    output: {
      path: __dirname,
      filename: 'main.js'
    },
    debug: isDev,
    module: {
      loaders: [ {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      } ]
    },
    externals: {
      // require("jquery") is external and available
      //  on the global var jQuery
      "jquery": "jQuery",
      "themeMain":"themeMain"

    }
  };

  if ( isDev ) {
    config.devtool = 'eval';
  }

  return config;
};