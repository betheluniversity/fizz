import { TweenLite } from 'gsap'

// =====================
// Adding a new plugin requires updating the webpack.config file!!
// =====================
const ScrollMagic = require('ScrollMagic')
// require('animation.gsap')
require('debug.addIndicators')
require('ScrollTo')
const anime = require('animejs')
// ====================

const controller = new ScrollMagic.Controller()

const pp1 = document.querySelector('#pp1')
const pps1 = pp1.querySelectorAll('.proofPoints .grid-cell')
const pp2 = document.querySelector('#pp2')
const pps2 = pp2.querySelectorAll('.proofPoints .grid-cell')

const scenePP1 = new ScrollMagic.Scene({
  triggerElement: pp1,
  offset: -500
})
.addIndicators() // add indicators (requires plugin)
.addTo(controller)

scenePP1.on('enter', function (e) {
  const animateProofPoints = anime.timeline({
    duration: 800,
    easing: [0.99, -0.64, 0.29, 1.56],
    reverse: false,
    delay: function (el, i) { return i * 200 }
  })

  animateProofPoints
    .add({
      targets: pps1,
      opacity: [0, 1],
      scale: [0.7, 1]
    })
})

scenePP1.on('progress', function () {
  pps1.forEach((pP) => {
    pP.style.opacity = 0
  })
})

const scenePP2 = new ScrollMagic.Scene({
  triggerElement: pp2,
  offset: -500
})
.addIndicators() // add indicators (requires plugin)
.addTo(controller)

scenePP2.on('enter', function (e) {
  const animateProofPoints = anime.timeline({
    duration: 800,
    easing: [0.99, -0.64, 0.29, 1.56],
    reverse: false,
    delay: function (el, i) { return i * 200 }
  })

  animateProofPoints
    .add({
      targets: pps2,
      opacity: [0, 1],
      scale: [0.7, 1]
    })
})

scenePP2.on('progress', function () {
  pps2.forEach((pP) => {
    pP.style.opacity = 0
  })
})

const anchorLinks = document.querySelectorAll('.stickyBar a[href^="#"]')

anchorLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault()
    const id = link.getAttribute('href')
    TweenLite.to(window, 1, {scrollTo: id})
  })
})
