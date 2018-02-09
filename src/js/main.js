require('./off-canvas.js')
require('./lory--custom.js')
require('./accordion.js')
require('./responsive-tables.js')
require('svg4everybody')
require('./bu_animate.js')
require('./action-nav.js')
require('./scrollmagic--custom.js')

function debounce (func, wait = 5, immediate = true) {
  var timeout
  return function () {
    var context = this, args = arguments
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
  const a = document.querySelectorAll('.sectionBlur')
  a.forEach(holder => {
    const aPos = (holder.offsetTop - window.scrollY) * -1 // multiply by -1 to turn the number
    let b = ((aPos - 500) / 25) // subtract 500 delay scroll start && divide by 25 to increase the blur
    const c = holder.querySelector('.sectionBlurImg img')

    if (aPos > 500 && b > 0) {
      c.style.filter = `blur(${b}px)`
    } else {
      c.style.filter = `blur(0)`
    }
  })
}

window.addEventListener('scroll', debounce(checkScroll))
