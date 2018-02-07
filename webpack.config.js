const webpack = require('webpack')
const path = require('path');
// require("scrollreveal");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'webpack.js'
  },
  module: {
    noParse: [/.\/src\/js\/odometer.min.js/]
    // loaders: [
    //   {
    // 	test: /(flickity|fizzy-ui-utils|get-size|unipointer)/,
    //     loader: 'imports?define=>false&this=>window'
    //   }
    // ]
  },
  resolve: {
    alias: {
      TweenLite: path.resolve('node_modules', 'gsap/src/minified/TweenLite.min.js'),
      TweenMax: path.resolve('node_modules', 'gsap/src/minified/TweenMax.min.js'),
      TimelineLite: path.resolve('node_modules', 'gsap/src/minified/TimelineLite.min.js'),
      TimelineMax: path.resolve('node_modules', 'gsap/src/minified/TimelineMax.min.js'),
      // ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/ScrollMagic.js'),
      'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'),
      'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
      )
    }
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    }),
    new webpack.ProvidePlugin({
      ScrollReveal: 'scrollreveal'
    })
  ]
}
