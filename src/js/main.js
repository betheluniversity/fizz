// import { aBF } from './anime--custom.js'
import stickybits from 'stickybits'
// import _ from 'lodash'
// import throttle from 'lodash.throttle'

// require('./off-canvas.js')
// require('./lory--custom.js')
// require('./accordion.js')
// require('./responsive-tables.js')
// require('svg4everybody')
// require('./bu_animate.js')
// require('./action-nav.js')
// require('./scrollmagic--custom.js')
// require('./anime--custom.js')

// stickybits('.stickyBar')
stickybits('.sectionBlurImg img')

// let sectionVisible = false

// function reequestTick () {
//   if (sectionVisible) {
//     window.requestAnimationFrame(checkScroll)
//   }
//   sectionVisible = false
// }

const isAtLeastIE11 = !!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/))
if (isAtLeastIE11) {
  document.body.classList.add('isAtLeastIE11')
}

const sBA = document.querySelector('#academics')
const sBATop = sBA.offsetTop
const sBABottom = sBATop + sBA.scrollHeight

// const sBL = document.querySelector('#learning')
// const sBLTop = sBL.offsetTop
// const sBLBottom = sBLTop + sBL.scrollHeight

// const sBS = document.querySelector('#spirituality')
// const sBSTop = sBS.offsetTop
// const sBSBottom = sBSTop + sBS.scrollHeight

const requestAnimationFrame = function () {}

function scrollPosition () {
  let wY = window.pageYOffset
  if (wY > sBATop && wY < sBABottom) {
    requestAnimationFrame(blurIt(sBA))
  }
  // else if (wY > sBLTop && wY < sBLBottom) {
  //   requestAnimationFrame(blurIt(sBL))
  // } else if (wY > sBSTop && wY < sBSBottom) {
  //   requestAnimationFrame(blurIt(sBL))
  // }
}

// function checkVis (section) {
//     const holderDistanceToTop = holder.offsetTop - window.pageYOffset;

//     if(holderDistanceToTop < 0){
//         const holderBottom = holder.offsetTop + holder.scrollHeight - window.pageYOffset;

//         if(holderBottom > 0){
//             sectionVisible = true
//         }
//     }
// }

function blurIt (section, progress) {
//   let n = 1

//   sectionDistanceToTop = section.

  const blurImg = section.querySelector('.sectionBlurImg')
  const blurAttribute = section.querySelector('.svgFilter feGaussianBlur')
  const blurAmount = window.pageYOffset * 0.0003 // divide to increase the blur rate
  console.log(blurAmount)

  // const sectionLink = holder.getAttribute('id')
  // const anchorLink = document.querySelector(`.stickyBar a[href^='#${sectionLink}']`)

  // if (holderDistanceToTop < 0 && holderBottom > 0) {
  // anchorLink.classList.add('active')
  // blurImg.style.filter = `url('#sharpBlur${n}')`

  if (blurAmount >= 1) {
    blurImg.style.opacity = '1'
    console.log('greater')
  } else if (blurAmount > 0 && blurAmount < 1) {
    console.log('tween')
    blurImg.style.opacity = blurAmount
  } else if (blurAmount <= 0) {
    console.log('under')
    blurImg.style.opacity = '0'
  }

  // if (blurAmount < 0) {
  //   blurImg.style.filter = 'blur(0px)'
  // } else if (blurAmount > 0 && blurAmount < 30) {
  //   blurImg.style.filter = 'blur(' + blurAmount + 'px)'
  // } else {
  //   blurImg.style.filter = 'blur(30px)'
  // }

  // if (blurAmount > 0 && blurAmount < 40) {
  //   blurAttribute.setAttribute('stdDeviation', `${blurAmount}`)
  // } else if (blurAmount > 40) {
  //   blurAttribute.setAttribute('stdDeviation', '40')
  // } else {
  //   blurImg.style.filter = `none`
  //   blurAttribute.setAttribute('stdDeviation', '0')
  //   anchorLink.classList.remove('active')
  // }

  // n++
  // )
}

window.addEventListener('scroll', scrollPosition, false)
