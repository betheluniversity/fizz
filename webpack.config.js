const webpack = require('webpack')
const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'newt.js'
  },
  module: {
    noParse: [/.\/src\/js\/vendor\/odometer.min.js/],
    // loaders: [
    //   {
    // 	test: /(flickity|fizzy-ui-utils|get-size|unipointer)/,
    //     loader: 'imports?define=>false&this=>window'
    //   }
    // ]
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      TweenLite: path.resolve(
        'node_modules',
        'gsap/src/minified/TweenLite.min.js'
      ),
      TweenMax: path.resolve(
        'node_modules',
        'gsap/src/minified/TweenMax.min.js'
      ),
      TimelineLite: path.resolve(
        'node_modules',
        'gsap/src/minified/TimelineLite.min.js'
      ),
      TimelineMax: path.resolve(
        'node_modules',
        'gsap/src/minified/TimelineMax.min.js'
      ),
      ScrollTo: path.resolve(
        'node_modules',
        'gsap/src/minified/plugins/ScrollToPlugin.min.js'
      ),
      'animation.gsap': path.resolve(
        'node_modules',
        'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'
      ),
      'debug.addIndicators': path.resolve(
        'node_modules',
        'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
      )
    }
  },
  plugins: [
    new MinifyPlugin({})
  ]
}
