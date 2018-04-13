import { TweenLite } from 'gsap'

// =====================
// Adding a new plugin requires updating the webpack.config file!!
// =====================
const ScrollMagic = require('ScrollMagic')
// require('animation.gsap')
// require('debug.addIndicators')
require('ScrollTo')
const anime = require('animejs')
// ====================

const controller = new ScrollMagic.Controller()

const acad = document.querySelector('#academics')
const acadImg = document.querySelector('#acadImg')
const pP = document.querySelectorAll('.proofPoints')
const pPS = document.querySelectorAll('.proofPoints .grid-cell')

const scenePPS = new ScrollMagic.Scene({
  triggerElement: pP
})
// .addIndicators() // add indicators (requires plugin)
  .addTo(controller)

scenePPS.on('enter', function (e) {
  const animateProofPoints = anime.timeline({
    delay: 0,
    duration: 1000,
    easing: [0.91, -0.64, 0.29, 1.56],
    loop: false,
    reverse: false,
    delay: function (el, i) { return i * 300 }
  })

  animateProofPoints
    .add({
      targets: pPS,
      opacity: [0, 1],
      translateY: ['2em', 0]
    })
}
)

// const progress = sceneAcademics.progress()

// sceneAcademics.on('progress', function (event) {
//   const prog = event.progress * 50
//   // TweenMax.set(blurAttribute, {
//   //   attr: {
//   //     'stdDeviation': prog
//   //   },
//   //   rotation: 0.01
//   // })
// })

// sceneAcademics.on('leave', function () {
//   // console.log('out')
// })

// sceneAcademics.triggerHook(0.5)

const anchorLinks = document.querySelectorAll('.stickyBar a[href^="#"]')

anchorLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault()
    const id = link.getAttribute('href')
    // controller.scrollTo(id, function () {
    //   console.log('finished')
    // })
    TweenLite.to(window, 1, {scrollTo: id})
  })
})
