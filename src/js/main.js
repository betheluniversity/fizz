import { aBF } from './anime--custom.js'

require('./off-canvas.js')
require('./lory--custom.js')
require('./accordion.js')
require('./responsive-tables.js')
require('svg4everybody')
require('./bu_animate.js')
require('./action-nav.js')
require('./scrollmagic--custom.js')
require('./anime--custom.js')

// Function to prevent constant polling. Modify 'wait' to control rate
function debounce (func, wait = 4, immediate = true) {
  var timeout
  return function () {
    var context = this
    var args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
};

function checkScroll () {
  const sectionBlur = document.querySelectorAll('.sectionBlur')
  let n = 1

  sectionBlur.forEach(holder => {
    const holderDistanceToTop = (holder.offsetTop - window.scrollY)
    const holderBottom = (holder.offsetTop + holder.scrollHeight) - window.scrollY

    const blurAmount = (holderDistanceToTop / -20) // divide to increase the blur rate
    const blurImg = holder.querySelector('.sectionBlurImg')
    const blurAttribute = holder.querySelector(`#sharpBlur${n} feGaussianBlur`)

    const sectionLink = holder.getAttribute('id')
    const anchorLink = document.querySelector(`.stickyBar a[href^='#${sectionLink}']`)

    if (holderDistanceToTop < 0 && holderBottom > 0) {
      anchorLink.classList.add('active')
      blurImg.style.filter = `url('#sharpBlur${n}')`

      if (blurAmount > 0 && blurAmount < 20) {
        blurAttribute.setAttribute('stdDeviation', `${blurAmount}`)
      } else if (blurAmount > 20) {
        blurAttribute.setAttribute('stdDeviation', '20')
      }
    } else {
      blurImg.style.filter = `none`
      blurAttribute.setAttribute('stdDeviation', '0')
      anchorLink.classList.remove('active')
    }

    const sectionTitle = holder.querySelector('.sectionBlurTitle')
    const sectionTitleTopX = sectionTitle.getBoundingClientRect().top
    const sectionTitleBottom = sectionTitle.getBoundingClientRect().bottom
    const isShown = (sectionTitleTopX - window.innerHeight) < 0
    const isPassed = sectionTitleBottom < 0

    // If sectionTitle does not contain class, animate and add class
    if (isShown && !isPassed) {
      if (!sectionTitle.classList.contains('animateBorder')) {
        sectionTitle.classList.add('animateBorder')
        const hB = sectionTitle.querySelectorAll('.animateBorder .horizontalBorder')
        const vB = sectionTitle.querySelectorAll('.animateBorder .verticalBorder')
        aBF(hB, vB)
      }
    }

    n++
  })
}

window.addEventListener('scroll', debounce(checkScroll))
