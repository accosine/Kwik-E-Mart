/* eslint
  comma-dangle: [0],
  no-var: [0],
  vars-on-top: [0]
*/

var path = require('path');
var util = require('util');
var webpack = require('webpack');
var pkg = require('./package.json');

var isInProduction = !!process.env.PRODUCTION;
var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));
var devServerHost = 'http://' + (process.env.DEV_HOST || '0.0.0.0:8080');
var bundleVariables = {};

// Read bundle_variables from package.json and merge with passed ENV_VARIABLES
// ENV_VARS take precedence. Configure via imports loader which modules will get
// bundle_variables injected.
Object.keys(pkg.bundle_variables).forEach(function(key) {
  if(process.env[key]) {
    bundleVariables[key] = process.env[key];
  }
  else {
    bundleVariables[key] = pkg.bundle_variables[key];
  }
});

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    __DEV__: !isInProduction
  }),
];

if (!isInProduction) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  );
}

module.exports = {
  context: path.join(__dirname, 'www'),
  debug: !isInProduction,
  devtool: !isInProduction ? '#inline-source-map' : false,
  entry: {
    app: !isInProduction ? [
      'webpack-dev-server/client?' + devServerHost,
      'webpack/hot/only-dev-server',
      './index.js'
    ] : ['./index.js']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: jsBundle,
    publicPath: '/',
    pathinfo: !isInProduction
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: !isInProduction ? ['react-hot', 'babel'] : ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.html$/,
        loader: [
          'file-loader?name=[path][name].[ext]',
          'template-html-loader?' + [
            'raw=true',
            'engine=lodash',
            'version=' + pkg.version,
            'debug=' + !isInProduction
          ].join('&')
        ].join('!')
      },
      {
        test: require.resolve('./www/config.js'),
        loader: 'imports?config=>' + encodeURIComponent(JSON.stringify(bundleVariables))
      }
    ]
  }
};
