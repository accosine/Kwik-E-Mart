var path = require('path');
var util = require('util');
var webpack = require('webpack');
var pkg = require('./package.json');
var DEBUG = process.env.NODE_ENV !== 'production';
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

var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));


var plugins = [
  new webpack.optimize.OccurenceOrderPlugin()
];

if (DEBUG) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin()
  );
}

var loaders = [
  {
    test: require.resolve('./www/config.js'),
    loader: 'imports?config=>' + encodeURIComponent(JSON.stringify(bundleVariables))
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader?optional=runtime'
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/,
    loader: 'file-loader?name=[path][name].[ext]'
  },
  {
    test: /\.html$/,
    loader: [
      'file-loader?name=[path][name].[ext]',
      'template-html-loader?' + [
        'raw=true',
        'engine=lodash',
        'version=' + pkg.version
      ].join('&')
    ].join('!')
  }
];

var entry = {
  app: ['./app.jsx']
};
if (DEBUG) {
  entry.app.push('webpack/hot/dev-server');
}

var config = {
  context: path.join(__dirname, 'www'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG ? '#inline-source-map' : false,
  entry: entry,
  output: {
    path: pkg.config.build_dir,
    publicPath: '/',
    filename: jsBundle,
    pathinfo: DEBUG
  },
  module: {
    loaders: loaders
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  }
};

module.exports = config;
