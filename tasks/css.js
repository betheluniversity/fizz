import { src, dest } from 'gulp'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'

export function css () {
    var plugins = [
        require('postcss-easy-import'),
        require('postcss-mixins'),
        require('postcss-nested'),
        require('postcss-simple-vars'),
        autoprefixer({
            remove: false,
            grid: true
        }),
        require('cssnano')
    ]
    return src('src/css/*.css')
        .pipe(postcss(plugins))
        .pipe(dest('./dist/css'))
}
