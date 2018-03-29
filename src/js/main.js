// import { aBF } from './anime--custom.js'
import stickybits from 'stickybits'

// require('./off-canvas.js')
require('./lory--custom.js')
// require('./accordion.js')
// require('./responsive-tables.js')
// require('svg4everybody')
// require('./bu_animate.js')
// require('./action-nav.js')

// stickybits('.stickyBar')
stickybits('#cleanAcademics', {scrollEl: '#academics'})
stickybits('#cleanExperience', {scrollEl: '#experience'})
stickybits('#cleanSpirituality', {scrollEl: '#spirituality'})

const isAtLeastIE11 = !!navigator.userAgent.match(/Edge|Trident.*rv[ :]?11\./)
if (isAtLeastIE11) {
  document.body.classList.add('isAtLeastIE11')
}

const sBA = document.querySelector('#academics')
const sBATop = sBA.offsetTop
const sBABottom = sBATop + sBA.scrollHeight

const sBE = document.querySelector('#experience')
const sBETop = sBE.offsetTop
const sBEBottom = sBETop + sBE.scrollHeight

const sBS = document.querySelector('#spirituality')
const sBSTop = sBS.offsetTop
const sBSBottom = sBSTop + sBS.scrollHeight

const requestAnimationFrame = function () {}

function scrollPosition () {
  let wY = window.pageYOffset
  if (wY > sBATop && wY < sBABottom ) {
    requestAnimationFrame(blurIt(sBA))
  }
  else if (wY > sBETop && wY < sBEBottom) {
    requestAnimationFrame(blurIt(sBE))
  } 
  else if (wY > sBSTop && wY < sBSBottom) {
    requestAnimationFrame(blurIt(sBS))
  }
}

function blurIt (section) {

  const cleanImg = section.querySelector('.sectionCleanImg')
  
  let blurAmount = 0
  blurAmount = (window.pageYOffset - section.offsetTop) / 20 // to increase the blur rate

  let opacityAmount = 0
  opacityAmount = (((window.pageYOffset * 0.006) - 10) * 0.1) * -1 // inverting to make opacity go from 1 => 0

  // const sectionLink = holder.getAttribute('id')
  // const anchorLink = document.querySelector(`.stickyBar a[href^='#${sectionLink}']`)

  // if (holderDistanceToTop < 0 && holderBottom > 0) {
  // anchorLink.classList.add('active')
  // blurImg.style.filter = `url('#sharpBlur${n}')`

  if (isAtLeastIE11) {
    if (opacityAmount >= 1) {
      cleanImg.style.opacity = '1'
    } else if (opacityAmount > 0 && opacityAmount < 1) {
      cleanImg.style.opacity = opacityAmount
    } else if (opacityAmount <= 0) {
      cleanImg.style.opacity = '0'
    }
  } else {
    if (blurAmount <= 0) {
      cleanImg.style.filter = 'blur(0px)'
    } else if (blurAmount > 0 && blurAmount < 40) {
      cleanImg.style.filter = 'blur(' + blurAmount + 'px)'
    } else if (blurAmount >= 40) {
      cleanImg.style.filter = 'blur(40px)'
    }
  }

  // if (blurAmount > 0 && blurAmount < 40) {
  //   blurAttribute.setAttribute('stdDeviation', `${blurAmount}`)
  // } else if (blurAmount > 40) {
  //   blurAttribute.setAttribute('stdDeviation', '40')
  // } else {
  //   blurAttribute.setAttribute('stdDeviation', '0')
  //   anchorLink.classList.remove('active')
  // }

  // n++
  // )
}

window.addEventListener('scroll', scrollPosition, true)
