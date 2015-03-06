// var sayHello = require('./say-hello');
// var imager = require('../../node_modules/imager.js/Imager.js')

// sayHello();
// imager();

var $ = require("jquery");
var domReady = require("../../node_modules/domready/src/ready.js");
// var offCanvas = require("./off-canvas.js");
var accordion = require("./accordion.js");
var Imager = require("../../node_modules/imager.js/Imager.js");
var slick = require("../../node_modules/slick-carousel/slick/slick.js");
var picturefill = require("./picturefill.min.js");
var odometer = require("./odometer.js");

// var binPolyfill = require("bindPolyfill");
// var smothScroll = require("smoothScroll");
// var bindPolyfill = require("../../node_modules/smooth-scroll/dist/js/bind-polyfill.js")
// var smoothScroll = require("../../node_modules/smooth-scroll/dist/js/smooth-scroll.js")

document.body.className = document.body.className.replace("no-js","js");

new Imager({ availableWidths: [300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600] });

// if (window.matchMedia("(min-width: 400px)").matches) {
//   console.log("over 400px");
//   document.querySelector("#calendar-mode").classList.toggle('NOOGS');
// } else {
// 	console.log("under 400px")
// }

domReady(function () {
    console.log("domReady is ready");

	$('.slick-carousel').slick({
	  lazyLoad: 'ondemand',
	  prevArrow: '<button type="button" class="slick-prev"></button>',
	  nextArrow: '<button type="button" class="slick-next"></button>'
	});

	// smoothScroll.init({
    //     speed: 500, // Integer. How fast to complete the scroll in milliseconds
    //     easing: 'easeInOutCubic', // Easing pattern to use
    //     updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    //     offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
    // });
});

// Calendar Stuff
// var mq  = matchMedia('(min-width: 800px)');
// mq.addListener(function(mql) {
//     if (mql.matches) {
//         document.querySelector("#calendar-mode").classList.add('calendar-grid');
//         document.querySelector("#calendar-mode").classList.remove('calendar-list');
//         document.querySelector(".view-mode--list > a").classList.remove('active');
//         document.querySelector(".view-mode--grid > a").classList.add('active');
//     }
//     else {
//     	document.querySelector("#calendar-mode").classList.add('calendar-list');
//     	document.querySelector("#calendar-mode").classList.remove('calendar-grid');
//     }
// });