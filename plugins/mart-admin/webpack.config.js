var path = require('path');
var util = require('util');
var webpack = require('webpack');
var pkg = require('./package.json');

var DEBUG = process.env.NODE_ENV !== 'production';

var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));


var plugins =[
  new webpack.optimize.OccurenceOrderPlugin(),
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
        'version='+pkg.version
      ].join('&')
    ].join('!')
  },
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
