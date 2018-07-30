const hzBr = document.querySelectorAll('#academics h1')

if (hzBr.length > 0) {
  window.anime = require('animejs')
}

const animateBorderTimeline = anime.timeline({
  delay: 0,
  duration: 1000,
  easing: 'easeOutCubic',
  loop: false
})

animateBorderTimeline
  .add({
    targets: hzBr,
    opacity: [0, 1]
  })
  .add({
    offset: 50,
    targets: hzBr,
    translateY: -50
  })
