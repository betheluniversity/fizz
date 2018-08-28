import { watch, series } from 'gulp'
import Browser from 'browser-sync'
import { js } from './js'
import { html } from './assemble'
import { css } from './css'

const browser = Browser.create()

function bsReload (done) {
    browser.reload()
    done()
}

export function serve () {
    let config = {
        server: 'dist',
        browser: 'Google Chrome'
    }

    browser.init(config)

    watch('./src/js/**.js', series(js, bsReload))
    watch('./src/css/**/*.css', series(css, bsReload))
    watch('./src/templates/**/*.hbs', series(html, bsReload))
    watch('./src/templates/**/*.json', series(html, bsReload))
}
