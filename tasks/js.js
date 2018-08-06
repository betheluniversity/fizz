import { src, dest } from 'gulp'
import webpack from 'webpack-stream'
import babel from 'gulp-babel'

export function js () {
    return src('./src/js/main.js')
        .pipe(webpack(require('../tasks/webpack.config.js')))
        .pipe(babel())
        .pipe(dest('./dist/js/'))
}
