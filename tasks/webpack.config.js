module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: 'quatro.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}
