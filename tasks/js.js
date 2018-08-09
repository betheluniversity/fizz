import { src, dest } from 'gulp'
import webpack from 'webpack-stream'
import babel from 'gulp-babel'
import minify from 'gulp-babel-minify'

export function js () {
    return src('./src/js/main.js')
        .pipe(webpack(require('../tasks/webpack.config.babel.js')))
        .pipe(minify())
        .pipe(dest('./dist/js/'))
}
