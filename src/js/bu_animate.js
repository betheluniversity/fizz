// Customizations for Scroll Reveal
// https://github.com/jlmakes/scrollreveal.js

window.sr = ScrollReveal({
    reset:true,
    mobile: false,
    duration: 500,
    delay: 200,
    distance: '60px',
    origin: 'left'
});

var revealUp = {origin: "bottom"};

if (document.querySelectorAll('.js-animateRevealUp').length != 0){
    sr.reveal(".js-animateRevealUp", revealUp);
}

var fadeIn = {
    distance: 0,
    scale: 1,
    duration: 1000
}

if (document.querySelectorAll('.js-animateFadeIn').length != 0){
    sr.reveal(".js-animateFadeIn", fadeIn);
}

var slideRight = {origin: "left",};
var slideLeft = {origin: "right",};
if (document.querySelectorAll('.js-animateSlideRight').length != 0){
    sr.reveal(".js-animateSlideRight", slideRight);
}

if (document.querySelectorAll('.js-animateSlideLeft').length != 0){
    sr.reveal(".js-animateSlideLeft", slideLeft);
}

if (document.querySelectorAll('.js-animateSequence').length != 0){
    sr.reveal(".seq", 200);

}

// ======= ODOMETER

var Odometer = require("./odometer.min.js");

var odometers = document.getElementsByClassName('odometer');

for (var i = 0, len = odometers.length; i < len; i++) {
    var el = odometers[i];
    var od = new Odometer({
        el: el
    });

    sr.reveal(el, {
        beforeReveal: function(el){
            el.innerHTML = el.getAttribute('data-final-number');
        },
        afterReset: function(el){
            el.innerHTML = 00;
        },
        distance: '0px',
        scale: 1,
        duration: 1700,
        mobile: true
    });
}
