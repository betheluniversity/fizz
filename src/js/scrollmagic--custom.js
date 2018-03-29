// import { blurIt } from './main.js'
// import { TweenLite } from 'gsap'
import { TweenMax } from 'gsap'

// =====================
// Adding a new plugin requires updating the webpack.config file!!
// =====================
const ScrollMagic = require('ScrollMagic')
// require('animation.gsap')
// require('debug.addIndicators')
// const TimelineMax = require("TimelineMax");
// const TweenMax = require('TweenMax')
// require('ScrollTo')
// const anime = require('animejs')
// ====================

const controller = new ScrollMagic.Controller()

const acad = document.querySelector('#academics')
const acadTop = acad.getBoundingClientRect().top
const acadBottom = acad.getBoundingClientRect().bottom
const acadHeight = acad.scrollHeight
const acadImg = acad.querySelector('.sectionBlurImg')
// const blurAttribute = acad.querySelector(`.svgFilter feGaussianBlur`)

const tween = TweenMax.to(acadImg, 1, { 
  opacity: '0',
})

const sceneAcademics = new ScrollMagic.Scene({
  triggerElement: '#academics',
  duration: 700
})
  .setTween(tween)
  // .addIndicators() // add indicators (requires plugin)
  .addTo(controller)

// const progress = sceneAcademics.progress()

sceneAcademics.on('progress', function (event) {
  const prog = event.progress * 50
  // TweenMax.set(blurAttribute, {
  //   attr: {
  //     'stdDeviation': prog
  //   },
  //   rotation: 0.01
  // })
})

sceneAcademics.on('leave', function () {
  console.log('out')
})

sceneAcademics.triggerHook(0.5)

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
