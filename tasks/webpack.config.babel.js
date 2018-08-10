module.exports = {
    mode: 'production',
    // mode: 'none',
    output: {
        filename: 'quatro.js'
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
