import { src, dest } from 'gulp'
import webpack from 'webpack-stream'

export function js () {
    return src('./src/js/main.js')
        .pipe(webpack(require('../tasks/webpack.config.babel.js')))
        .pipe(dest('./dist/js/'))
}
