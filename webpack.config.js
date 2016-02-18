var webpack = require("webpack");

module.exports = {
	entry: './src/js/main.js',
	output: {
		filename: './builds/js/webpack.js'
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
		new webpack.optimize.UglifyJsPlugin({ xoutput: {comments:false}})
	]
}