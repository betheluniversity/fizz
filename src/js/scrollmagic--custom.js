
// =====================
// Adding a new plugin requires updating the webpack.config file!!
// =====================
const ScrollMagic = require('ScrollMagic')
require('animation.gsap')
require('debug.addIndicators')
// const TimelineMax = require("TimelineMax");
const TweenMax = require('TweenMax')
require('ScrollTo')
// const anime = require('animejs')
// ====================

const controller = new ScrollMagic.Controller()

const scene = new ScrollMagic.Scene({
  triggerElement: '.sectionBlurContent .sectionBlurTitle'
})
  // .addIndicators() // add indicators (requires plugin)
  .addTo(controller)

controller.scrollTo(function (newpos) {
  TweenMax.to(window, 0.5, {scrollTo: {y: newpos}})
})

const anchorLinks = document.querySelectorAll('.stickyBar a[href^="#"]')
anchorLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault()
    const id = link.getAttribute('href')
    controller.scrollTo(id)

    // if (window.history && window.history.pushState) {
    //   history.pushState('', document.title, id)
    // }
  })
})
