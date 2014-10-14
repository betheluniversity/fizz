// var sayHello = require('./say-hello');
// var imager = require('../../node_modules/imager.js/Imager.js')

// sayHello();
// imager();


var domReady = require("../../node_modules/domready/src/ready.js");
// var offCanvas = require("./offCanvas.js");
var accordion = require("./accordion.js");
var Imager = require("../../bower_components/imager.js/Imager.js");

var binPolyfill = require("bindPolyfill");
var smothScroll = require("smoothScroll");
// var bindPolyfill = require("../../bower_components/smooth-scroll.js/dist/js/bind-polyfill.js")
// var smoothScroll = require("../../bower_components/smooth-scroll.js/dist/js/smooth-scroll.js")

new Imager({ availableWidths: [300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200] });

domReady(function () {
    console.log("domReady is ready");
    smoothScroll.init({
        speed: 500, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
        offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
    });
})
}