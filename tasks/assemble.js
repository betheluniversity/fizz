import { series } from 'gulp'
import assemble from 'assemble'
import rename from 'gulp-rename'

var app = assemble()

function loadAssemble (cb) {
    app.partials('src/templates/partials/*.hbs')
    app.layouts('src/templates/layouts/*.hbs')
    app.pages('src/templates/pages/*.hbs')
    app.data('src/templates/data/*json')
    cb()
}

function buildAssemble () {
    return app.toStream('pages')
        .pipe(app.renderFile())
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(app.dest('dist'))
}

export const html = series(loadAssemble, buildAssemble)
