module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: 'blanco.js'
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
