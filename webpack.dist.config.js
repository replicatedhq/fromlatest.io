/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

var path = require('path');
var webpack = require('webpack');

var config = {

  output: {
    publicPath: '/assets/',
    path: 'dist/assets/',
    filename: 'main.js'
  },

  debug: false,
  devtool: false,
  entry: [
    'bootstrap-webpack!./bootstrap.config.js',
    './<%= pkg.src %>/javascript/main.js'
  ],

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'actions': path.join(__dirname, '<%= pkg.src %>/javascript/actions'),
      'assets': path.join(__dirname, '<%= pkg.src %>/assets'),
      'components': path.join(__dirname, '<%= pkg.src %>/javascript/components'),
      'mixins': path.join(__dirname, '<%= pkg.src %>/javascript/mixins'),
      'services': path.join(__dirname, '<%= pkg.src %>/javascript/services'),
      'stores': path.join(__dirname, '<%= pkg.src %>/javascript/stores'),
      'styles': path.join(__dirname, '<%= pkg.src %>/styles')
    }
  },

  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },

  eslint: {
    configFile: 'eslint-dist.json',
    useEslintrc: false
  },

  module: {
    preLoaders: [{
      test: /src\/javascript\/.+\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    }],

    loaders: [
      { test: /src\/javascript\/.+\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /node_modules\/replicated-config-render\/.+\.jsx$/, loader: 'babel-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(png|jpg|gif|svg)$/, loader: 'url-loader?limit=8192' },

      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' }
    ]
  }

};

module.exports = config;
