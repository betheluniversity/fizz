const ScrollMagic = require('ScrollMagic')
require('animation.gsap')
require('debug.addIndicators')
// const TimelineMax = require("TimelineMax");
const TweenMax = require('TweenMax')

const controller = new ScrollMagic.Controller()

// const tween = TweenMax.from('.sectionBlurBody', 1, {x: '-100%'})

// const scene = new ScrollMagic.Scene({
//   triggerElement: '.sectionBlurTitle',
//   //   duration: '100%',
//   offset: -400
// }).setTween(tween).addIndicators().addTo(controller)

// scene.setClassToggle('.sectionBlurBody', 'myclass')

// const tween2 = TweenMax.from(".sploot2", 1, { x: "100%" });
// const scene2 = new ScrollMagic.Scene({
//   triggerElement: ".trigger2",
//   duration: "100%",
//   offset: -400
// })
//   .setTween(tween2)
//   .addIndicators()
//   .addTo(controller);
