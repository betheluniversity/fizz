var webpack = require("webpack");
// require("scrollreveal");

module.exports = {
	entry: './src/js/main.js',
	output: {
		filename: 'webpack.js'
	},
	module: {
		noParse: [
			/.\/src\/js\/odometer.min.js/
		],
		loaders: [
		  {
  			test: /(flickity|fizzy-ui-utils|get-size|unipointer)/,
  	        loader: 'imports?define=>false&this=>window'
		  }
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({ output: {comments:false}})
		new webpack.ProvidePlugin({
		    ScrollReveal: "scrollreveal"
		})

	]
}