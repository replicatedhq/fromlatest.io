/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */

var path = require('path');
var webpack = require('webpack');

var config = {

  output: {
    publicPath: '/assets/',
    filename: 'main.js'
  },

  cache: true,
  debug: true,
  devtool: 'eval-source-map',
  entry: [
    'bootstrap-webpack!./bootstrap.config.js',
    'webpack/hot/only-dev-server',
    './<%= pkg.src %>/javascript/main.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.NoErrorsPlugin()
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

  module: {
    preLoaders: [{
      test: /src\/javascript\/.+\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react']
      }
    }],

    loaders: [
      { test: /src\/javascript\/.+\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /node_modules\/dockerfilelint\/.+\.js$/, loader: 'babel-loader' },
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
