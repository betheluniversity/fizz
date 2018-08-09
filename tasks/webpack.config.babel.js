module.exports = {
    entry: [
        './src/js/main.js'
    ],
    mode: 'production',
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
