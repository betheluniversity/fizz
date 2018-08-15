import { parallel, series } from 'gulp'
import { clean } from './tasks/clean'
import { js } from './tasks/js'
import { css } from './tasks/css'
import { html } from './tasks/assemble'
import { serve } from './tasks/server'

export {
    js,
    css,
    clean,
    html
}

exports.serve = series(
    clean,
    parallel(js, css, html),
    serve
)

exports.build = series(
    clean,
    parallel(js, css, html)
)
