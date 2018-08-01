const { src, dest, series, parallel, watch } = require('gulp')
const assemble = require('assemble')
const webpack = require('webpack-stream')
const browserSync = require('browser-sync')
const reload = browserSync.reload
const del = require('del')
const vinylPaths = require('vinyl-paths')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const babel = require('gulp-babel')

var $ = require('gulp-load-plugins')()
var outputDir = './builds/'

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

function js () {
    return src('./src/js/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(babel())
        .pipe(dest(outputDir + '/js/'))
        .pipe(reload({
            stream: true
        }))
}

exports.js = js

var app = assemble()

function loadTemps (cb) {
    app.partials('src/templates/partials/*.hbs')
    app.layouts('src/templates/layouts/*.hbs')
    app.pages('src/templates/pages/*.hbs')
    app.data('src/templates/data/*json')
    cb()
}

function buildTemps () {
    return app.toStream('pages')
        .pipe(app.renderFile())
        .pipe($.rename({
            extname: '.html'
        }))
        .pipe(app.dest(outputDir + ''))
        .pipe(reload({
            stream: true
        }))
}

// // ===========================

// // http://css-tricks.com/svg-symbol-good-choice-icons
// // https://github.com/jkphl/svg-sprite
// var config = {
//     'mode': {
//         'symbol': true
//     }
// }

// gulp.task('sprites', function () {
//     return src('./src/assets/icon-sprite/*.svg')
//         .pipe($.svgSprite(config))
//         .pipe(dest(outputDir + '/assets/icon-sprite'))
// })

function copyfiles () {
    src('./src/assets/**')
        .pipe(dest(outputDir + '/assets'))
}

function browser () {
    browserSync({
        server: {
            baseDir: outputDir
        },
        browser: 'Google Chrome'
    })
}

// const clean = () => del(outputDir)


function clean () {
    return src(outputDir + '/*')
        .pipe(dest(outputDir))
        .pipe(vinylPaths(del))
}
exports.clean = clean

// exports.build = series(
//     clean,
//     parallel(
//         js,
//         css
//         // copyfiles
//         // assemble
//     ))

watch('src/*.css', css)
watch('./src/css/**/*.css', css)
watch('./src/templates/**/*.hbs', series(loadTemps, buildTemps))
watch('./src/templates/**/*.json', series(loadTemps, buildTemps))
// watch('./src/assets/icon-sprite/*.svg', sprites)
// watch('./src/assets/filters/*.svg', copyfiles)
watch('./src/js/*.js', js)

exports.serve = series(
    clean,
    parallel(
        js,
        css
    ),
    series(
        loadTemps,
        buildTemps
    ),
    browser
)
