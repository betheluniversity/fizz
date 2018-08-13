module.exports = {
    entry: {
        index: './src/js/main.js',
        lazy: './src/js/lazysizes.js'
    },
    mode: 'production',
    // mode: 'none',
    output: {
        filename: '[name].quatro.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}
