var webpack = require('webpack');  
module.exports = {  
  entry: [
    'webpack/hot/only-dev-server',
    "./www/js/app.js"
  ],
  output: {
    path: __dirname + '/www/js',
    filename: "bundle.js",
    publicPath: "/www/js"
  },
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]

};
