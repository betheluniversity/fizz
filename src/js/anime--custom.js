const hzBr = document.querySelectorAll(".horizontalBorder");

if (hzBr.length > 0) {
    window.anime = require('animejs')
}

const animateBorderTimeline = anime.timeline({
  delay: 0,
  duration: 500,
  easing: "easeOutCubic",
  loop: false
})

function aBF (hB, vB) {
  animateBorderTimeline
    .add({
      targets: hB,
      width: [0, "100%"]
    })
    .add({
      offset: 50,
      targets: vB,
      height: [0, "100%"]
    })
}

export { aBF }