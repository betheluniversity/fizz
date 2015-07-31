var webpack = require("webpack");

module.exports = {
	entry: './src/js/main.js',
	output: {
		filename: './builds/bundle.js'
	},
	module: {
		noParse: [
			/.\/node_modules\/flickity/,
			/.\/src\/js\/odometer.min.js/
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({ output: {comments:false}})
	]
};