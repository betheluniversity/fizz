const { src, dest } = require('gulp')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
const { require, outputDir, reload } = require('./gulpfile')

function css () {
    var plugins = [
        require('postcss-easy-import'),
        require('postcss-mixins'),
        require('postcss-nested'),
        require('postcss-simple-vars'),
        autoprefixer({
            remove: false
        }),
        require('cssnano')
    ]
    return src('src/css/*.css')
        .pipe(postcss(plugins))
        .pipe(dest(outputDir + '/css'))
        .pipe(reload({
            stream: true
        }))
}
exports.css = css
